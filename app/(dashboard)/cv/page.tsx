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
        <div className="bg-zinc-900 text-white p-4 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full"></div>
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
              <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-wide">{personalInfo.name.toUpperCase()}</h1>
              <div className="text-base md:text-xl font-light mb-2 md:mb-3 text-emerald-400">{personalInfo.role}</div>
              <div className="text-xs md:text-sm text-zinc-400">{personalInfo.tagline}</div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-zinc-800 text-zinc-300 p-3 md:p-5 flex flex-wrap gap-3 md:gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">@</span>
            <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-white transition-colors">{personalInfo.contact.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">T</span>
            <span>{personalInfo.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">L</span>
            <span>Jakarta, Indonesia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">G</span>
            <a href={personalInfo.contact.github} target="_blank" className="hover:text-white transition-colors">github.com/nohypelabs</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">in</span>
            <a href={personalInfo.contact.linkedin} target="_blank" className="hover:text-white transition-colors">linkedin.com/in/abdul-gofur</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">X</span>
            <a href={personalInfo.contact.twitter} target="_blank" className="hover:text-white transition-colors">@nohypelabs</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvProfile}</h2>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mt-3">
                {cvData.profile[language]}
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvEducation}</h2>
              <div className="mt-3 space-y-4">
                {cvData.education.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-sm">{item.year}</div>
                    <div className="font-semibold text-sm text-zinc-900">{item.title}</div>
                    {item.description[language] && <div className="text-xs text-zinc-500">{item.description[language]}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvBackground}</h2>
              <div className="mt-3 space-y-4">
                {cvData.background.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-sm">{item.year}</div>
                    <div className="font-semibold text-sm text-zinc-900">{item.title}</div>
                    {item.description[language] && <div className="text-xs text-zinc-500">{item.description[language]}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvWorkExperience}</h2>
              <div className="mt-3 space-y-4">
                {cvData.workExperience.map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-sm">{item.year}</div>
                    <div className="font-semibold text-sm text-zinc-900">{item.title}</div>
                    <div className="text-xs text-zinc-500">{item.description[language]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvTechnicalSkills}</h2>
              <div className="mt-3 space-y-3">
                {cvData.skillCategories.map((skill, i) => (
                  <div key={i} className="bg-zinc-50 p-3 rounded-lg border-l-2 border-emerald-500">
                    <div className="font-semibold text-sm text-zinc-900">{t[skill.labelKey]}</div>
                    <div className="text-xs text-zinc-500">{skill.skills}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvLanguages}</h2>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {cvData.languages.map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center text-emerald-400 font-bold text-xs mb-2">
                      {item.level[language]}
                    </div>
                    <div className="text-xs font-semibold text-zinc-700">{item.name[language]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section - Full Width */}
          <div className="col-span-1 md:col-span-2 bg-zinc-50 p-4 md:p-6 rounded-xl mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 pb-2 border-b-2 border-emerald-500 inline-block">{t.cvPortfolioProjects}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-5">
              {productionProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-zinc-200 hover:-translate-y-1 transition-transform">
                  <h3 className="font-bold text-sm md:text-base mb-2 text-zinc-900">{project.title}</h3>
                  <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="bg-zinc-900 text-white px-2 py-0.5 rounded text-[9px] font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    {project.demo && (
                      <a href={project.demo} className="text-emerald-600 hover:underline text-xs font-semibold" target="_blank">
                        {new URL(project.demo).hostname}
                      </a>
                    )}
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase">
                      {t.cvProduction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 text-zinc-400 text-center p-3 md:p-5 text-xs">
          Portfolio: <a href="https://abdulgofur.vercel.app" target="_blank" className="font-semibold text-emerald-400 hover:underline">abdulgofur.vercel.app</a> |{" "}
          Created by {personalInfo.name} | {new Date().getFullYear()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: 210mm 297mm;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
            background: white !important;
            display: block !important;
            align-items: flex-start !important;
          }

          .shadow-2xl {
            box-shadow: none !important;
            max-width: 100% !important;
          }

          body > div {
            page-break-before: avoid !important;
          }

          .space-y-6 { gap: 0.5rem !important; }
          .space-y-6 > * + * { margin-top: 0.5rem !important; }
          .space-y-4 { gap: 0.25rem !important; }
          .space-y-4 > * + * { margin-top: 0.25rem !important; }
          .space-y-3 { gap: 0.25rem !important; }
          .space-y-3 > * + * { margin-top: 0.25rem !important; }

          .bg-zinc-900 { padding: 0.5rem 1rem !important; }
          .bg-zinc-900 img { width: 50px !important; height: 50px !important; }
          .bg-zinc-900 .flex.items-center { gap: 0.75rem !important; }

          .grid.grid-cols-1 {
            padding: 0.75rem !important;
            gap: 0.75rem !important;
            grid-template-columns: 1fr 1fr !important;
          }

          h1 { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; line-height: 1.2 !important; }
          h2 { font-size: 1rem !important; margin-bottom: 0.25rem !important; padding-bottom: 0.125rem !important; }
          h3 { font-size: 0.75rem !important; margin-bottom: 0.25rem !important; }
          p, div { font-size: 0.65rem !important; line-height: 1.2 !important; margin-bottom: 0 !important; }

          .bg-white.rounded-lg { padding: 0.5rem !important; margin-bottom: 0.25rem !important; }

          .rounded-full.bg-zinc-900 {
            width: 2.5rem !important;
            height: 2.5rem !important;
            font-size: 0.6rem !important;
          }

          .bg-zinc-50 { padding: 0.35rem !important; margin-bottom: 0.25rem !important; }

          .text-center.p-3 { padding: 0.35rem !important; }
          .flex.flex-wrap.gap-3 { padding: 0.5rem !important; gap: 0.35rem !important; }

          .absolute.-top-20 { display: none !important; }

          .border-l-2 { padding-left: 0.5rem !important; }
          .absolute.w-2.h-2 { width: 0.375rem !important; height: 0.375rem !important; left: -0.25rem !important; }

          .col-span-1.md\\:col-span-2 { grid-column: 1 / -1 !important; }

          .bg-zinc-50.p-4 { padding: 0.5rem !important; margin-top: 0.5rem !important; }

          .grid.grid-cols-1.md\\:grid-cols-2 {
            gap: 0.5rem !important;
            grid-template-columns: 1fr 1fr !important;
            display: grid !important;
          }

          .bg-zinc-900.text-white.px-2 { padding: 0.125rem 0.35rem !important; font-size: 0.5rem !important; }

          .rounded-lg { border-radius: 0.25rem !important; }
          .rounded-xl { border-radius: 0.25rem !important; }

          .space-y-6 > div, .space-y-3 > div { page-break-inside: avoid; }
          a[href]:after { content: none !important; }
        }
      `}</style>
    </div>
  );
}
