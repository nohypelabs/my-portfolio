import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { cvData as cvDataType } from "@/lib/data/cvData";
import type { personalInfo as personalInfoType } from "@/lib/data/personalInfo";
import type { projects as projectsType } from "@/lib/data/projects";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica", fontWeight: "normal" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

// ── Colors (exact match from web) ──────────────
const TEAL = "#10b981";
const DARK = "#0f172a";
const GRAY_600 = "#475569";
const GRAY_500 = "#64748b";
const GRAY_400 = "#94a3b8";
const BORDER = "#e2e8f0";
const BG_CARD = "#f8fafc";

// ── Styles (exact match from web page.tsx inline styles) ──
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.4,
    color: DARK,
    padding: "0.4in 0.5in", // matches web: padding: "0.4in 0.5in"
  },

  // Header — matches web: padding: "18pt 20pt", bg-zinc-900
  header: {
    backgroundColor: DARK,
    color: "white",
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: TEAL,
    borderStyle: "solid",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerRole: {
    fontSize: 10,
    fontWeight: 300,
    color: TEAL,
    marginBottom: 6,
  },
  // Contact: 2-column grid — matches web: gap: 12pt, fontSize: 7.5pt
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    borderTopStyle: "solid",
  },
  contactCell: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  contactLabel: {
    color: TEAL,
    fontWeight: "bold",
    fontSize: 7.5,
    width: 14,
  },
  contactText: {
    color: GRAY_400,
    fontSize: 7.5,
  },
  contactLink: {
    color: GRAY_400,
    fontSize: 7.5,
    textDecoration: "none",
  },

  // Grid — matches web: gap: 14pt
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  leftCol: { flex: 1 },
  rightCol: { flex: 1 },

  // Section headers — matches web: fontSize: 10pt, fontWeight: 700
  h2: {
    fontSize: 10,
    fontWeight: "bold",
    color: DARK,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: TEAL,
    borderBottomStyle: "solid",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 10,
  },
  h2First: {
    fontSize: 10,
    fontWeight: "bold",
    color: DARK,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: TEAL,
    borderBottomStyle: "solid",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 0,
  },

  // Profile — matches web: fontSize: 8pt, color: #475569
  profileText: {
    fontSize: 8,
    color: GRAY_600,
    lineHeight: 1.5,
  },

  // Timeline entries — matches web: borderLeft: 2pt solid #e2e8f0
  entry: {
    borderLeftWidth: 2,
    borderLeftColor: BORDER,
    borderLeftStyle: "solid",
    paddingLeft: 10,
    marginBottom: 8,
  },
  entryYear: {
    fontSize: 7,
    fontWeight: "bold",
    color: TEAL,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  entryTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: DARK,
    marginBottom: 2,
  },
  entryDesc: {
    fontSize: 7.5,
    color: GRAY_500,
    lineHeight: 1.4,
  },
  bulletItem: {
    fontSize: 7,
    color: GRAY_600,
    lineHeight: 1.4,
    marginTop: 1,
  },

  // Skill cards — matches web: padding: "5pt 8pt"
  skillCard: {
    backgroundColor: BG_CARD,
    borderLeftWidth: 2.5,
    borderLeftColor: TEAL,
    borderLeftStyle: "solid",
    padding: "4pt 6pt",
    borderRadius: 3,
    marginBottom: 4,
  },
  skillLabel: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: DARK,
  },
  skillList: {
    fontSize: 7,
    color: GRAY_500,
    lineHeight: 1.4,
  },

  // Languages — matches web: grid 3 cols, gap 6pt
  langRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  langItem: {
    flex: 1,
    alignItems: "center",
  },
  langBadge: {
    backgroundColor: DARK,
    color: TEAL,
    fontSize: 6,
    fontWeight: "bold",
    padding: "3pt 6pt",
    borderRadius: 20,
    textAlign: "center",
  },
  langName: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#334155",
    textAlign: "center",
    marginTop: 2,
  },

  // Project cards — matches web: padding: "5pt 8pt"
  projectCard: {
    backgroundColor: BG_CARD,
    borderLeftWidth: 2.5,
    borderLeftColor: TEAL,
    borderLeftStyle: "solid",
    padding: "4pt 6pt",
    borderRadius: 3,
    marginBottom: 4,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: DARK,
    flex: 1,
  },
  projectLink: {
    fontSize: 6,
    color: TEAL,
    textDecoration: "none",
    flexShrink: 0,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    marginTop: 3,
  },
  tag: {
    backgroundColor: DARK,
    color: "white",
    fontSize: 5,
    fontWeight: "bold",
    padding: "1pt 4pt",
    borderRadius: 2,
  },

  // Footer — matches web: padding: "6pt", fontSize: "6.5pt"
  footer: {
    backgroundColor: DARK,
    color: GRAY_400,
    textAlign: "center",
    padding: 6,
    borderRadius: 4,
    fontSize: 6.5,
    marginTop: 12,
  },
  footerLink: {
    color: TEAL,
    textDecoration: "none",
    fontWeight: "bold",
  },
});

// ── Helpers ──────────────────────────────────────

function Highlights({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <View style={{ marginTop: 3 }}>
      {items.map((h, i) => (
        <View key={i} style={{ flexDirection: "row", marginTop: 1 }}>
          <Text style={{ color: TEAL, fontSize: 6, marginRight: 3 }}>▸</Text>
          <Text style={s.bulletItem}>{h}</Text>
        </View>
      ))}
    </View>
  );
}

function ContactItem({ label, text, href }: { label: string; text: string; href?: string }) {
  return (
    <View style={s.contactCell}>
      <Text style={s.contactLabel}>{label}</Text>
      {href ? (
        <Link src={href} style={s.contactLink}>{text}</Link>
      ) : (
        <Text style={s.contactText}>{text}</Text>
      )}
    </View>
  );
}

// ── Main ─────────────────────────────────────────

interface Props {
  cvData: typeof cvDataType;
  personalInfo: typeof personalInfoType;
  projects: typeof projectsType;
  language: "en" | "id";
  translations: Record<string, string>;
  baseUrl?: string;
}

export default function CVPDFDocument({
  cvData,
  personalInfo,
  projects,
  language,
  translations: t,
  baseUrl = "",
}: Props) {
  const photoUrl = `${baseUrl}/picture/nasaq-id-photo.png`;
  const productionProjects = projects.filter((p) => p.status === "production");

  return (
    <Document>
      <Page size="LEGAL" style={s.page}>
        {/* Header — exact match from web */}
        <View style={s.header}>
          <Image src={photoUrl} style={s.headerPhoto} />
          <View style={s.headerInfo}>
            <Text style={s.headerName}>{personalInfo.name.toUpperCase()}</Text>
            <Text style={s.headerRole}>{personalInfo.role}</Text>
            <View style={s.contactGrid}>
              <ContactItem label="@" text={personalInfo.contact.email} />
              <ContactItem label="W" text="WhatsApp" href={`https://wa.me/${personalInfo.contact.phone.replace(/^0/, "62")}`} />
              <ContactItem label="L" text="Bandung, Indonesia" />
              <ContactItem label="G" text="github.com/nohypelabs" href={personalInfo.contact.github} />
              <ContactItem label="in" text="linkedin.com/in/abdul-gofur" href={personalInfo.contact.linkedin} />
              <ContactItem label="X" text="@nohypelabs" href={personalInfo.contact.twitter} />
            </View>
          </View>
        </View>

        {/* Two Column Grid — exact match from web */}
        <View style={s.grid}>
          {/* LEFT COLUMN */}
          <View style={s.leftCol}>
            <Text style={s.h2First}>{t.cvProfile}</Text>
            <Text style={s.profileText}>{cvData.profile[language]}</Text>

            <Text style={s.h2}>{language === "en" ? "Technical Experience" : "Pengalaman Teknis"}</Text>
            {cvData.technicalExperience.map((item, i) => (
              <View key={i} style={s.entry}>
                <Text style={s.entryYear}>{item.year}</Text>
                <Text style={s.entryTitle}>{item.title}</Text>
                <Text style={s.entryDesc}>{item.description[language]}</Text>
                {"highlights" in item && (item as any).highlights?.length > 0 && (
                  <Highlights items={(item as any).highlights} />
                )}
              </View>
            ))}

            <Text style={s.h2}>{language === "en" ? "Other Experience" : "Pengalaman Lain"}</Text>
            {cvData.otherExperience.map((item, i) => (
              <View key={i} style={s.entry}>
                <Text style={s.entryYear}>{item.year}</Text>
                <Text style={s.entryTitle}>{item.title}</Text>
                <Text style={s.entryDesc}>{item.description[language]}</Text>
              </View>
            ))}

            <Text style={s.h2}>{t.cvEducation}</Text>
            {cvData.education.map((item, i) => (
              <View key={i} style={s.entry}>
                <Text style={s.entryYear}>{item.year}</Text>
                <Text style={s.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={s.entryDesc}>{item.description[language]}</Text>
                ) : null}
              </View>
            ))}
          </View>

          {/* RIGHT COLUMN */}
          <View style={s.rightCol}>
            <Text style={s.h2First}>{t.cvTechnicalSkills}</Text>
            {cvData.skillCategories.map((skill, i) => (
              <View key={i} style={s.skillCard}>
                <Text style={s.skillLabel}>{t[skill.labelKey]}</Text>
                <Text style={s.skillList}>{skill.skills}</Text>
              </View>
            ))}

            <Text style={s.h2}>{t.cvLanguages}</Text>
            <View style={s.langRow}>
              {cvData.languages.map((item, i) => (
                <View key={i} style={s.langItem}>
                  <Text style={s.langBadge}>{item.level[language]}</Text>
                  <Text style={s.langName}>{item.name[language]}</Text>
                </View>
              ))}
            </View>

            <Text style={s.h2}>{t.cvPortfolioProjects}</Text>
            {productionProjects.map((project) => (
              <View key={project.id} style={s.projectCard}>
                <View style={s.projectHeader}>
                  <Text style={s.projectTitle}>{project.title}</Text>
                  {project.demo ? (
                    <Link src={project.demo} style={s.projectLink}>
                      {new URL(project.demo).hostname}
                    </Link>
                  ) : null}
                </View>
                <View style={s.tagRow}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <Text key={tag} style={s.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}

            <Text style={s.h2}>{t.cvBackground}</Text>
            {cvData.background.map((item, i) => (
              <View key={i} style={s.entry}>
                <Text style={s.entryYear}>{item.year}</Text>
                <Text style={s.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={s.entryDesc}>{item.description[language]}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* Footer — exact match from web */}
        <View style={s.footer}>
          <Text>
            nasaq.id{" "}
            <Link src="https://nasaq.id" style={s.footerLink}>
              nasaq.id
            </Link>{" "}
            | Founder profile by {personalInfo.name} | 2026
          </Text>
        </View>
      </Page>
    </Document>
  );
}
