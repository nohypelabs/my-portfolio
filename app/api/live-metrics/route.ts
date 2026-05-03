import { NextResponse } from "next/server";
import postgres from "postgres";

async function supabaseCount(
  url: string,
  key: string,
  table: string
): Promise<number> {
  const res = await fetch(
    `${url}/rest/v1/${table}?select=id&limit=0`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "count=exact",
      },
      next: { revalidate: 300 },
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
  seratQc: { entries: 80187, photos: 160374 },
  wcCheck: { inspections: 3293, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 0, orders: 0, users: 0 },
};

export async function GET() {
  try {
    const results = await Promise.allSettled([
      supabaseCount(
        process.env.SERAT_QC_SUPABASE_URL!,
        process.env.SERAT_QC_SUPABASE_ANON_KEY!,
        "entries"
      ),
      supabaseCount(
        process.env.WC_CHECK_SUPABASE_URL!,
        process.env.WC_CHECK_SUPABASE_ANON_KEY!,
        "inspection_records"
      ),
      supabaseCount(
        process.env.LAKUPOS_SUPABASE_URL!,
        process.env.LAKUPOS_SUPABASE_SERVICE_KEY!,
        "transactions"
      ),
      supabaseCount(
        process.env.LAKUPOS_SUPABASE_URL!,
        process.env.LAKUPOS_SUPABASE_SERVICE_KEY!,
        "products"
      ),
      supabaseCount(
        process.env.LAKUPOS_SUPABASE_URL!,
        process.env.LAKUPOS_SUPABASE_SERVICE_KEY!,
        "outlets"
      ),
      process.env.ECOMMERCE_DATABASE_URL
        ? pgCount(process.env.ECOMMERCE_DATABASE_URL, "Product")
        : Promise.resolve(0),
      process.env.ECOMMERCE_DATABASE_URL
        ? pgCount(process.env.ECOMMERCE_DATABASE_URL, "Order")
        : Promise.resolve(0),
      process.env.ECOMMERCE_DATABASE_URL
        ? pgCount(process.env.ECOMMERCE_DATABASE_URL, "User")
        : Promise.resolve(0),
    ]);

    const val = (i: number, fallback: number) =>
      results[i].status === "fulfilled" && results[i].value > 0
        ? results[i].value
        : fallback;

    return NextResponse.json(
      {
        seratQc: {
          entries: val(0, FALLBACK.seratQc.entries),
          photos: val(0, FALLBACK.seratQc.entries) * 2,
        },
        wcCheck: {
          inspections: val(1, FALLBACK.wcCheck.inspections),
          users: 53,
          locations: 49,
        },
        lakuPos: {
          transactions: val(2, FALLBACK.lakuPos.transactions),
          products: val(3, FALLBACK.lakuPos.products),
          outlets: val(4, FALLBACK.lakuPos.outlets),
        },
        ecommerce: {
          products: val(5, FALLBACK.ecommerce.products),
          orders: val(6, FALLBACK.ecommerce.orders),
          users: val(7, FALLBACK.ecommerce.users),
        },
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json({
      ...FALLBACK,
      fetchedAt: new Date().toISOString(),
      cached: true,
    });
  }
}
