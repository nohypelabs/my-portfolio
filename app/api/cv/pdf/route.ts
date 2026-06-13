import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import CVPDFDocument from "@/components/CVPDFDocument";
import { cvData } from "@/lib/data/cvData";
import { personalInfo } from "@/lib/data/personalInfo";
import { projects } from "@/lib/data/projects";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get("lang") || "id") as "en" | "id";
    const t = translations[lang];

    // Get base URL for image resolution
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;

    const doc = React.createElement(CVPDFDocument, {
      cvData,
      personalInfo,
      projects,
      language: lang,
      translations: t,
      baseUrl,
    });

    const stream = await renderToStream(doc);

    // @ts-expect-error — ReadableStream type mismatch between Node and Web
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="nasaq-id-founder-profile-${lang}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(error) },
      { status: 500 }
    );
  }
}
