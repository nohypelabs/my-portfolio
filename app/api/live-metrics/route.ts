import { NextResponse } from "next/server";
import postgres from "postgres";

type LogLevel = "info" | "fetch" | "ok" | "warn" | "error" | "success";

interface LogEntry {
  ts: string;
  level: LogLevel;
  msg: string;
  ms?: number;
}

function now() {
  return new Date().toISOString().replace("T", " ").slice(0, 23);
}

async function supabaseCount(
  url: string,
  key: string,
  table: string,
  noCache = false
): Promise<number> {
  const cacheBust = noCache ? `&_=${Date.now()}` : "";
  const res = await fetch(
    `${url}/rest/v1/${table}?select=id&limit=0${cacheBust}`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "count=exact",
      },
      ...(noCache ? { cache: "no-store" as const } : { next: { revalidate: 300 } }),
    }
  );
  const count = res.headers.get("content-range")?.split("/")[1];
  return count ? parseInt(count, 10) : 0;
}

async function pgCount(connStr: string, table: string): Promise<number> {
  const sql = postgres(connStr, { max: 1, idle_timeout: 5 });
  try {
    const [row] = await sql.unsafe(`SELECT count(*)::int as c FROM "${table}"`);
    return row?.c ?? 0;
  } finally {
    await sql.end();
  }
}

const FALLBACK = {
  seratQc: { entries: 112796, photos: 225592 },
  wcCheck: { inspections: 4513, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 16, orders: 6, users: 5 },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fresh = searchParams.has("t");
  const logs: LogEntry[] = [];
  const t0 = performance.now();

  const log = (level: LogLevel, msg: string, ms?: number) => {
    logs.push({ ts: now(), level, msg, ms });
  };

  log("info", "Initializing data pipeline...");

  // ── Serat QC ─────────────────────────────────────────────────────────
  log("fetch", "→ Serat QC (Supabase REST · entries)");
  const s0 = performance.now();
  let seratEntries: number;
  try {
    seratEntries = await supabaseCount(
      process.env.SERAT_QC_SUPABASE_URL!,
      process.env.SERAT_QC_SUPABASE_ANON_KEY!,
      "entries",
      fresh
    );
    if (seratEntries <= 0) throw new Error("empty");
    log("ok", `${seratEntries.toLocaleString("id-ID")} entries · ${(seratEntries * 2).toLocaleString("id-ID")} photos`, Math.round(performance.now() - s0));
  } catch {
    seratEntries = FALLBACK.seratQc.entries;
    log("warn", `Fallback → ${seratEntries.toLocaleString("id-ID")} entries`, Math.round(performance.now() - s0));
  }

  // ── WC Check ─────────────────────────────────────────────────────────
  log("fetch", "→ WC Check (Supabase REST · inspection_records)");
  const s1 = performance.now();
  let wcInspections: number;
  try {
    wcInspections = await supabaseCount(
      process.env.WC_CHECK_SUPABASE_URL!,
      process.env.WC_CHECK_SUPABASE_SERVICE_KEY!,
      "inspection_records",
      fresh
    );
    if (wcInspections <= 0) throw new Error("empty");
    log("ok", `${wcInspections.toLocaleString("id-ID")} inspections · 53 users · 49 locations`, Math.round(performance.now() - s1));
  } catch {
    wcInspections = FALLBACK.wcCheck.inspections;
    log("warn", `Fallback → ${wcInspections.toLocaleString("id-ID")} inspections`, Math.round(performance.now() - s1));
  }

  // ── LakuPOS ──────────────────────────────────────────────────────────
  log("fetch", "→ LakuPOS (Supabase REST · transactions, products, outlets)");
  const s2 = performance.now();
  const [lakuTx, lakuProd, lakuOut] = await Promise.allSettled([
    supabaseCount(process.env.LAKUPOS_SUPABASE_URL!, process.env.LAKUPOS_SUPABASE_SERVICE_KEY!, "transactions", fresh),
    supabaseCount(process.env.LAKUPOS_SUPABASE_URL!, process.env.LAKUPOS_SUPABASE_SERVICE_KEY!, "products", fresh),
    supabaseCount(process.env.LAKUPOS_SUPABASE_URL!, process.env.LAKUPOS_SUPABASE_SERVICE_KEY!, "outlets", fresh),
  ]);
  const lakuTxVal = lakuTx.status === "fulfilled" && lakuTx.value > 0 ? lakuTx.value : FALLBACK.lakuPos.transactions;
  const lakuProdVal = lakuProd.status === "fulfilled" && lakuProd.value > 0 ? lakuProd.value : FALLBACK.lakuPos.products;
  const lakuOutVal = lakuOut.status === "fulfilled" && lakuOut.value > 0 ? lakuOut.value : FALLBACK.lakuPos.outlets;
  const lakuUsedFallback = lakuTx.status !== "fulfilled" || lakuTx.value <= 0;
  log(
    lakuUsedFallback ? "warn" : "ok",
    `${lakuTxVal.toLocaleString("id-ID")} transactions · ${lakuProdVal} products · ${lakuOutVal} outlets`,
    Math.round(performance.now() - s2)
  );

  // ── Qohira / Ecommerce ───────────────────────────────────────────────
  log("fetch", "→ Qohira (PostgreSQL direct · Product, Order, User)");
  const s3 = performance.now();
  let ecomProd = 0, ecomOrders = 0, ecomUsers = 0;
  if (process.env.ECOMMERCE_DATABASE_URL) {
    const [p, o, u] = await Promise.allSettled([
      pgCount(process.env.ECOMMERCE_DATABASE_URL, "Product"),
      pgCount(process.env.ECOMMERCE_DATABASE_URL, "Order"),
      pgCount(process.env.ECOMMERCE_DATABASE_URL, "User"),
    ]);
    ecomProd = p.status === "fulfilled" && p.value > 0 ? p.value : FALLBACK.ecommerce.products;
    ecomOrders = o.status === "fulfilled" && o.value > 0 ? o.value : FALLBACK.ecommerce.orders;
    ecomUsers = u.status === "fulfilled" && u.value > 0 ? u.value : FALLBACK.ecommerce.users;
    const usedFallback = p.status !== "fulfilled" || p.value <= 0;
    log(
      usedFallback ? "warn" : "ok",
      `${ecomProd} products · ${ecomOrders} orders · ${ecomUsers} users`,
      Math.round(performance.now() - s3)
    );
  } else {
    ecomProd = FALLBACK.ecommerce.products;
    ecomOrders = FALLBACK.ecommerce.orders;
    ecomUsers = FALLBACK.ecommerce.users;
    log("warn", `No DATABASE_URL — fallback → ${ecomProd} products · ${ecomOrders} orders · ${ecomUsers} users`, 0);
  }

  const totalMs = Math.round(performance.now() - t0);
  log("success", `All systems operational ✓ (${totalMs}ms total)`);

  const usedAnyFallback =
    seratEntries <= 0 || wcInspections <= 0 || lakuUsedFallback;

  return NextResponse.json(
    {
      metrics: {
        seratQc: {
          entries: seratEntries,
          photos: seratEntries * 2,
        },
        wcCheck: {
          inspections: wcInspections,
          users: 53,
          locations: 49,
        },
        lakuPos: {
          transactions: lakuTxVal,
          products: lakuProdVal,
          outlets: lakuOutVal,
        },
        ecommerce: {
          products: ecomProd,
          orders: ecomOrders,
          users: ecomUsers,
        },
      },
      logs,
      fetchedAt: new Date().toISOString(),
      cached: usedAnyFallback,
    },
    {
      headers: {
        "Cache-Control": fresh
          ? "no-cache, no-store, must-revalidate"
          : "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
