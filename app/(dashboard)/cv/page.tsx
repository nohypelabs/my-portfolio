"use client";

import { Download } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { personalInfo } from "@/lib/data/personalInfo";
import { projects } from "@/lib/data/projects";
import { cvData } from "@/lib/data/cvData";

export default function CVPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const productionProjects = projects.filter((p) => p.status === "production");

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <button
        onClick={handleDownloadPDF}
        className="fixed top-20 right-4 md:top-24 md:right-8 z-50 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 print:hidden transition-colors cursor-pointer"
      >
        <Download className="w-5 h-5" />
        <span className="hidden md:inline">{t.cvDownloadPDF}</span>
      </button>

      <div className="cv-page bg-white text-zinc-900 mx-auto" style={{ width: "7in", minHeight: "12.5in", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "9pt", lineHeight: 1.4 }}>

        {/* Header */}
        <div className="cv-header bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-md overflow-hidden relative" style={{ padding: "18pt 20pt", marginBottom: "10pt" }}>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full print-hide" />
          <div className="relative z-10">
            <h1 style={{ fontSize: "22pt", fontWeight: 800, letterSpacing: "1.5pt", marginBottom: "2pt", textTransform: "uppercase" as const }}>
              {personalInfo.name.toUpperCase()}
            </h1>
            <div style={{ fontSize: "10pt", fontWeight: 300, color: "#10b981", marginBottom: "6pt" }}>{personalInfo.role}</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12pt", fontSize: "7.5pt", color: "#94a3b8", marginTop: "8pt", paddingTop: "6pt", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>@</span>{personalInfo.contact.email}</span>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>W</span>WhatsApp</span>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>L</span>Bandung, Indonesia</span>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>G</span><a href={personalInfo.contact.github} target="_blank" style={{ color: "#94a3b8", textDecoration: "none" }}>github.com/nohypelabs</a></span>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>in</span><a href={personalInfo.contact.linkedin} target="_blank" style={{ color: "#94a3b8", textDecoration: "none" }}>linkedin.com/in/abdul-gofur</a></span>
              <span><span style={{ color: "#10b981", fontWeight: 600, marginRight: "3pt" }}>X</span><a href={personalInfo.contact.twitter} target="_blank" style={{ color: "#94a3b8", textDecoration: "none" }}>@nohypelabs</a></span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="cv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14pt" }}>

          {/* LEFT COLUMN */}
          <div>
            {/* Profile */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvProfile}</h2>
            <p style={{ fontSize: "8pt", color: "#475569", lineHeight: 1.5 }}>{cvData.profile[language]}</p>

            {/* Technical Experience */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{language === "en" ? "Technical Experience" : "Pengalaman Teknis"}</h2>
            {cvData.technicalExperience.map((item, i) => (
              <div key={i} className="cv-entry" style={{ borderLeft: "2pt solid #e2e8f0", paddingLeft: "10pt", marginBottom: "8pt", position: "relative" as const }}>
                <div style={{ position: "absolute" as const, left: "-4.5pt", top: "4pt", width: "7pt", height: "7pt", background: "#10b981", borderRadius: "50%", border: "1.5pt solid white" }} />
                <div style={{ fontSize: "7pt", fontWeight: 700, color: "#10b981", textTransform: "uppercase" as const, letterSpacing: "0.3pt" }}>{item.year}</div>
                <div style={{ fontSize: "8.5pt", fontWeight: 600, color: "#0f172a", marginBottom: "2pt" }}>{item.title}</div>
                <div style={{ fontSize: "7.5pt", color: "#64748b", lineHeight: 1.4 }}>{item.description[language]}</div>
                {"highlights" in item && (item as any).highlights?.length > 0 && (
                  <ul style={{ listStyle: "none", marginTop: "3pt" }}>
                    {(item as any).highlights.map((h: string, j: number) => (
                      <li key={j} style={{ fontSize: "7pt", color: "#475569", paddingLeft: "8pt", position: "relative" as const, lineHeight: 1.4, marginBottom: "1pt" }}>
                        <span style={{ position: "absolute" as const, left: 0, color: "#10b981", fontSize: "6pt" }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Other Experience */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{language === "en" ? "Other Experience" : "Pengalaman Lain"}</h2>
            {cvData.otherExperience.map((item, i) => (
              <div key={i} className="cv-entry" style={{ borderLeft: "2pt solid #e2e8f0", paddingLeft: "10pt", marginBottom: "8pt", position: "relative" as const }}>
                <div style={{ position: "absolute" as const, left: "-4.5pt", top: "4pt", width: "7pt", height: "7pt", background: "#10b981", borderRadius: "50%", border: "1.5pt solid white" }} />
                <div style={{ fontSize: "7pt", fontWeight: 700, color: "#10b981", textTransform: "uppercase" as const, letterSpacing: "0.3pt" }}>{item.year}</div>
                <div style={{ fontSize: "8.5pt", fontWeight: 600, color: "#0f172a", marginBottom: "2pt" }}>{item.title}</div>
                <div style={{ fontSize: "7.5pt", color: "#64748b", lineHeight: 1.4 }}>{item.description[language]}</div>
              </div>
            ))}

            {/* Education */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvEducation}</h2>
            {cvData.education.map((item, i) => (
              <div key={i} className="cv-entry" style={{ borderLeft: "2pt solid #e2e8f0", paddingLeft: "10pt", marginBottom: "8pt", position: "relative" as const }}>
                <div style={{ position: "absolute" as const, left: "-4.5pt", top: "4pt", width: "7pt", height: "7pt", background: "#10b981", borderRadius: "50%", border: "1.5pt solid white" }} />
                <div style={{ fontSize: "7pt", fontWeight: 700, color: "#10b981", textTransform: "uppercase" as const, letterSpacing: "0.3pt" }}>{item.year}</div>
                <div style={{ fontSize: "8.5pt", fontWeight: 600, color: "#0f172a", marginBottom: "2pt" }}>{item.title}</div>
                {item.description[language] && <div style={{ fontSize: "7.5pt", color: "#64748b", lineHeight: 1.4 }}>{item.description[language]}</div>}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Technical Skills */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvTechnicalSkills}</h2>
            {cvData.skillCategories.map((skill, i) => (
              <div key={i} style={{ background: "#f8fafc", borderLeft: "2.5pt solid #10b981", padding: "5pt 8pt", borderRadius: "3pt", marginBottom: "4pt" }}>
                <div style={{ fontSize: "7.5pt", fontWeight: 600, color: "#0f172a" }}>{t[skill.labelKey]}</div>
                <div style={{ fontSize: "7pt", color: "#64748b", lineHeight: 1.4 }}>{skill.skills}</div>
              </div>
            ))}

            {/* Languages */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvLanguages}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6pt", textAlign: "center" as const }}>
              {cvData.languages.map((item, i) => (
                <div key={i}>
                  <div style={{ background: "#0f172a", color: "#10b981", fontSize: "6pt", fontWeight: 700, padding: "3pt 6pt", borderRadius: "20pt", display: "inline-block", marginBottom: "2pt" }}>{item.level[language]}</div>
                  <div style={{ fontSize: "7pt", fontWeight: 600, color: "#334155" }}>{item.name[language]}</div>
                </div>
              ))}
            </div>

            {/* Portfolio Projects */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvPortfolioProjects}</h2>
            {productionProjects.map((project) => (
              <div key={project.id} style={{ background: "#f8fafc", borderLeft: "2.5pt solid #10b981", padding: "5pt 8pt", borderRadius: "3pt", marginBottom: "4pt" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "7.5pt", fontWeight: 600, color: "#0f172a" }}>{project.title}</span>
                  {project.demo && (
                    <a href={project.demo} target="_blank" style={{ fontSize: "6pt", color: "#10b981", textDecoration: "none" }}>
                      {new URL(project.demo).hostname}
                    </a>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "2pt", marginTop: "3pt" }}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} style={{ background: "#0f172a", color: "white", fontSize: "5pt", fontWeight: 600, padding: "1pt 4pt", borderRadius: "2pt" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Background */}
            <h2 className="cv-h2" style={{ fontSize: "10pt", fontWeight: 700, color: "#0f172a", textTransform: "uppercase" as const, letterSpacing: "0.8pt", borderBottom: "2pt solid #10b981", paddingBottom: "3pt", marginBottom: "8pt", marginTop: "10pt" }}>{t.cvBackground}</h2>
            {cvData.background.map((item, i) => (
              <div key={i} className="cv-entry" style={{ borderLeft: "2pt solid #e2e8f0", paddingLeft: "10pt", marginBottom: "8pt", position: "relative" as const }}>
                <div style={{ position: "absolute" as const, left: "-4.5pt", top: "4pt", width: "7pt", height: "7pt", background: "#10b981", borderRadius: "50%", border: "1.5pt solid white" }} />
                <div style={{ fontSize: "7pt", fontWeight: 700, color: "#10b981", textTransform: "uppercase" as const, letterSpacing: "0.3pt" }}>{item.year}</div>
                <div style={{ fontSize: "8.5pt", fontWeight: 600, color: "#0f172a", marginBottom: "2pt" }}>{item.title}</div>
                {item.description[language] && <div style={{ fontSize: "7.5pt", color: "#64748b", lineHeight: 1.4 }}>{item.description[language]}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: "#0f172a", color: "#94a3b8", textAlign: "center" as const, padding: "6pt", borderRadius: "4pt", fontSize: "6.5pt", marginTop: "12pt" }}>
          Portfolio: <a href="https://nohypelabs.vercel.app" style={{ color: "#10b981", textDecoration: "none", fontWeight: 600 }}>nohypelabs.vercel.app</a> |{" "}
          Created by {personalInfo.name} | {new Date().getFullYear()}
        </div>
      </div>

      {/* Print Styles — Legal 8.5" x 14" */}
      <style jsx global>{`
        @media print {
          @page {
            size: 8.5in 14in;
            margin: 0.75in;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            width: auto !important;
            background: white !important;
          }

          /* Hide everything except the CV */
          nav, footer, .print-hide, [data-theme-toggle], button {
            display: none !important;
          }

          /* Reset page wrapper */
          .min-h-screen, main, [class*="layout"] {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            display: block !important;
          }

          /* CV page container */
          .cv-page {
            width: 7in !important;
            min-height: auto !important;
            margin: 0 auto !important;
            box-shadow: none !important;
          }

          /* No page breaks inside entries */
          .cv-entry, .cv-grid > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Links — no underline in print */
          a {
            text-decoration: none !important;
          }

          a[href]::after {
            content: none !important;
          }
        }
      `}</style>
    </>
  );
}
