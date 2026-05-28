"use client";

import { Download } from "lucide-react";
import Image from "next/image";
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
    <div className="min-h-screen flex items-center justify-center p-2 md:p-6">
      <button
        onClick={handleDownloadPDF}
        className="fixed top-20 right-4 md:top-24 md:right-8 z-50 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 print:hidden transition-colors"
      >
        <Download className="w-5 h-5" />
        <span className="hidden md:inline">{t.cvDownloadPDF}</span>
      </button>

      <div className="w-full md:max-w-[210mm] bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-900 text-white p-4 md:p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full print-hide"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="shrink-0">
              <Image
                src="/avatar.jpg"
                alt={personalInfo.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-emerald-500/30"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-1 tracking-wide">{personalInfo.name.toUpperCase()}</h1>
              <div className="text-base md:text-lg font-light mb-1 text-emerald-400">{personalInfo.role}</div>
              <div className="text-xs md:text-sm text-zinc-400">{personalInfo.tagline}</div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-zinc-800 text-zinc-300 p-2 md:p-4 flex flex-wrap gap-2 md:gap-5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">@</span>
            <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-white transition-colors">{personalInfo.contact.email}</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">W</span>
            <a href={`https://wa.me/${personalInfo.contact.phone.replace(/^0/, "62")}`} target="_blank" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">L</span>
            <span>Bandung, Indonesia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">G</span>
            <a href={personalInfo.contact.github} target="_blank" className="hover:text-white transition-colors">github.com/nohypelabs</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">in</span>
            <a href={personalInfo.contact.linkedin} target="_blank" className="hover:text-white transition-colors">linkedin.com/in/abdul-gofur</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">X</span>
            <a href={personalInfo.contact.twitter} target="_blank" className="hover:text-white transition-colors">@nohypelabs</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="cv-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-3 md:p-6">
          {/* Left Column */}
          <div className="cv-col space-y-4">
            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvProfile}</h2>
              <p className="text-xs text-zinc-600 leading-relaxed mt-2">
                {cvData.profile[language]}
              </p>
            </div>

            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{language === "en" ? "Technical Experience" : "Pengalaman Teknis"}</h2>
              <div className="mt-2 space-y-2">
                {cvData.technicalExperience.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-3 relative">
                    <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-xs">{item.year}</div>
                    <div className="font-semibold text-xs text-zinc-900">{item.title}</div>
                    <div className="text-[11px] text-zinc-500">{item.description[language]}</div>
                    {"highlights" in item && (item as any).highlights?.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {(item as any).highlights.map((h: string, j: number) => (
                          <li key={j} className="text-[10px] text-zinc-600 flex items-start gap-1">
                            <span className="text-emerald-500 mt-0.5">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{language === "en" ? "Other Experience" : "Pengalaman Lain"}</h2>
              <div className="mt-2 space-y-2">
                {cvData.otherExperience.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-3 relative">
                    <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-xs">{item.year}</div>
                    <div className="font-semibold text-xs text-zinc-900">{item.title}</div>
                    <div className="text-[11px] text-zinc-500">{item.description[language]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="print-hide">
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvBackground}</h2>
              <div className="mt-2 space-y-2">
                {cvData.background.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-3 relative">
                    <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-xs">{item.year}</div>
                    <div className="font-semibold text-xs text-zinc-900">{item.title}</div>
                    {item.description[language] && <div className="text-[11px] text-zinc-500">{item.description[language]}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvEducation}</h2>
              <div className="mt-2 space-y-2">
                {cvData.education.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-3 relative">
                    <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-xs">{item.year}</div>
                    <div className="font-semibold text-xs text-zinc-900">{item.title}</div>
                    {item.description[language] && <div className="text-[11px] text-zinc-500">{item.description[language]}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="cv-col space-y-4">
            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvTechnicalSkills}</h2>
              <div className="mt-2 space-y-1.5">
                {cvData.skillCategories.map((skill, i) => (
                  <div key={i} className="bg-zinc-50 p-2 rounded-lg border-l-2 border-emerald-500">
                    <div className="font-semibold text-xs text-zinc-900">{t[skill.labelKey]}</div>
                    <div className="text-[11px] text-zinc-500">{skill.skills}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvLanguages}</h2>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {cvData.languages.map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="mx-auto rounded-full bg-zinc-900 flex items-center justify-center text-emerald-400 font-bold text-[9px] px-2 py-1.5 mb-1">
                      {item.level[language]}
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-700">{item.name[language]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-h2 text-lg md:text-xl font-bold text-zinc-900 mb-2 pb-1 border-b-2 border-emerald-500 inline-block">{t.cvPortfolioProjects}</h2>
              <div className="mt-2 space-y-2">
                {productionProjects.map((project) => (
                  <div key={project.id} className="bg-zinc-50 p-2 rounded-lg border-l-2 border-emerald-500">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-xs text-zinc-900">{project.title}</h3>
                      {project.demo && (
                        <a href={project.demo} className="text-emerald-600 hover:underline text-[10px] font-medium" target="_blank">
                          {new URL(project.demo).hostname}
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="bg-zinc-900 text-white px-1.5 py-0.5 rounded text-[8px] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 text-zinc-400 text-center p-2 md:p-4 text-[10px]">
          Portfolio: <a href="https://nohypelabs.vercel.app" target="_blank" className="font-semibold text-emerald-400 hover:underline">nohypelabs.vercel.app</a> |{" "}
          Created by {personalInfo.name} | {new Date().getFullYear()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: 215mm 330mm;
            margin: 6mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          body { margin: 0; padding: 0; width: auto !important; }

          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
            background: white !important;
            display: block !important;
            align-items: flex-start !important;
            width: auto !important;
          }

          .shadow-2xl {
            box-shadow: none !important;
            width: 200mm !important;
            max-width: 200mm !important;
            min-height: 290mm !important;
            margin: 0 auto !important;
          }

          .print-hide { display: none !important; }

          /* Header ultra compact */
          .bg-zinc-900.text-white { padding: 3mm 6mm !important; }
          .bg-zinc-900.text-white img { width: 28px !important; height: 28px !important; }
          h1 { font-size: 11pt !important; margin-bottom: 0 !important; line-height: 1 !important; }
          .text-emerald-400.text-base, .text-emerald-400.md\\:text-lg { font-size: 7pt !important; margin-bottom: 0 !important; }
          .text-xs.md\\:text-sm.text-zinc-400 { font-size: 6pt !important; }

          /* Contact bar ultra compact */
          .bg-zinc-800 { padding: 1.5mm 6mm !important; gap: 2mm !important; font-size: 5.5pt !important; }

          /* Main grid — 2 columns tight */
          .cv-grid {
            padding: 2mm 6mm !important;
            gap: 3mm !important;
            grid-template-columns: 1fr 1fr !important;
            display: grid !important;
          }
          .cv-col { gap: 1.5mm !important; }
          .cv-col > div { margin-top: 1mm !important; }

          /* Section headings */
          .cv-h2 { font-size: 7.5pt !important; margin-bottom: 0.5mm !important; padding-bottom: 0.3mm !important; }

          /* Timeline entries */
          .border-l-2 { padding-left: 2mm !important; margin-bottom: 0.5mm !important; }
          .border-l-2 .font-bold.text-emerald-600 { font-size: 6pt !important; }
          .border-l-2 .font-semibold.text-xs { font-size: 6pt !important; }
          .border-l-2 .text-\\[11px\\], .border-l-2 .text-xs.text-zinc-500 { font-size: 5.5pt !important; line-height: 1.15 !important; }
          .border-l-2 .text-\\[10px\\] { display: none !important; }

          /* Profile text */
          .text-xs.text-zinc-600 { font-size: 6pt !important; line-height: 1.2 !important; }

          /* Skills compact */
          .bg-zinc-50 { padding: 1mm 2mm !important; margin-bottom: 0.5mm !important; }
          .bg-zinc-50 .font-semibold.text-xs { font-size: 5.5pt !important; }
          .bg-zinc-50 .text-\\[11px\\] { font-size: 5pt !important; }

          /* Language badges */
          .rounded-full.bg-zinc-900 { padding: 0.5mm 1.5mm !important; font-size: 5pt !important; width: auto !important; height: auto !important; }
          .text-\\[11px\\].font-semibold.text-zinc-700 { font-size: 5pt !important; }

          /* Project cards */
          .cv-col .bg-zinc-50 { padding: 1mm 2mm !important; margin-bottom: 0.5mm !important; }
          .cv-col h3 { font-size: 5.5pt !important; }
          .cv-col .bg-zinc-900 { font-size: 4pt !important; padding: 0.2mm 1mm !important; }
          .cv-col .text-emerald-600 { font-size: 5pt !important; }

          /* Footer ultra compact */
          .bg-zinc-900.text-zinc-400 { padding: 1.5mm 6mm !important; font-size: 5pt !important; }

          /* Remove decorative elements */
          .absolute.-top-20 { display: none !important; }
          .absolute.-left-\\[4px\\], .absolute.-left-\\[5px\\] { display: none !important; }

          /* No page breaks — force 1 page */
          .cv-grid, .cv-col, .cv-col > div { page-break-inside: avoid !important; break-inside: avoid !important; }

          a[href]:after { content: none !important; }
        }
      `}</style>
    </div>
  );
}
