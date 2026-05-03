import { NextResponse } from "next/server";

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

export async function GET() {
  const seratUrl = process.env.SERAT_QC_SUPABASE_URL!;
  const seratKey = process.env.SERAT_QC_SUPABASE_ANON_KEY!;
  const wcUrl = process.env.WC_CHECK_SUPABASE_URL!;
  const wcKey = process.env.WC_CHECK_SUPABASE_ANON_KEY!;

  try {
    const [seratEntries, wcInspections] = await Promise.all([
      supabaseCount(seratUrl, seratKey, "entries"),
      supabaseCount(wcUrl, wcKey, "inspection_records"),
    ]);

    return NextResponse.json({
      seratQc: {
        entries: seratEntries,
        photos: seratEntries * 2,
      },
      wcCheck: {
        inspections: wcInspections,
        users: 53,
        locations: 49,
      },
      fetchedAt: new Date().toISOString(),
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json({
      seratQc: { entries: 80187, photos: 160374 },
      wcCheck: { inspections: 3293, users: 53, locations: 49 },
      fetchedAt: new Date().toISOString(),
      cached: true,
    });
  }
}
