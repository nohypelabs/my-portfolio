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

const TEAL = "#10b981";
const DARK = "#0f172a";
const GRAY_600 = "#475569";
const GRAY_500 = "#64748b";
const GRAY_400 = "#94a3b8";
const BORDER = "#e2e8f0";
const BG_CARD = "#f8fafc";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.4,
    color: DARK,
    padding: "0.35in 0.45in",
  },

  // ── Header ──────────────────────────────────────
  header: {
    backgroundColor: DARK,
    color: "white",
    padding: "10pt 12pt",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  headerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: TEAL,
    borderStyle: "solid",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  headerRole: {
    fontSize: 8.5,
    fontWeight: 300,
    color: TEAL,
    marginBottom: 4,
  },
  // Contact: 2-column grid — guaranteed no wrap
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.15)",
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
    fontWeight: 700,
    fontSize: 7,
    width: 12,
  },
  contactText: {
    color: GRAY_400,
    fontSize: 7,
  },
  contactLink: {
    color: GRAY_400,
    fontSize: 7,
    textDecoration: "none",
  },

  // ── Grid ────────────────────────────────────────
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
  },

  // ── Section headers ─────────────────────────────
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: DARK,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: TEAL,
    borderBottomStyle: "solid",
    paddingBottom: 2,
    marginBottom: 6,
    marginTop: 8,
  },
  sectionTitleFirst: {
    fontSize: 9.5,
    fontWeight: 700,
    color: DARK,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: TEAL,
    borderBottomStyle: "solid",
    paddingBottom: 2,
    marginBottom: 6,
    marginTop: 0,
  },

  // ── Profile ─────────────────────────────────────
  profileText: {
    fontSize: 7.5,
    color: GRAY_600,
    lineHeight: 1.5,
  },

  // ── Timeline entries ────────────────────────────
  entry: {
    borderLeftWidth: 2,
    borderLeftColor: BORDER,
    borderLeftStyle: "solid",
    paddingLeft: 8,
    marginBottom: 6,
  },
  entryYear: {
    fontSize: 6.5,
    fontWeight: 700,
    color: TEAL,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  entryTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: DARK,
    marginBottom: 1,
  },
  entryDesc: {
    fontSize: 7,
    color: GRAY_500,
    lineHeight: 1.35,
  },
  bulletItem: {
    fontSize: 6.5,
    color: GRAY_600,
    lineHeight: 1.35,
    marginTop: 1,
  },

  // ── Skill cards ─────────────────────────────────
  skillCard: {
    backgroundColor: BG_CARD,
    borderLeftWidth: 2.5,
    borderLeftColor: TEAL,
    borderLeftStyle: "solid",
    padding: "3pt 5pt",
    borderRadius: 2,
    marginBottom: 3,
  },
  skillLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: DARK,
  },
  skillList: {
    fontSize: 6.5,
    color: GRAY_500,
    lineHeight: 1.35,
  },

  // ── Languages ───────────────────────────────────
  langRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  langItem: {
    flex: 1,
    alignItems: "center",
  },
  langBadge: {
    backgroundColor: DARK,
    color: TEAL,
    fontSize: 5.5,
    fontWeight: 700,
    padding: "2pt 0",
    width: 52,
    borderRadius: 10,
    textAlign: "center",
  },
  langName: {
    fontSize: 6.5,
    fontWeight: 600,
    color: "#334155",
    textAlign: "center",
    marginTop: 2,
  },

  // ── Project cards ───────────────────────────────
  projectCard: {
    backgroundColor: BG_CARD,
    borderLeftWidth: 2.5,
    borderLeftColor: TEAL,
    borderLeftStyle: "solid",
    padding: "4pt 6pt",
    borderRadius: 2,
    marginBottom: 4,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: {
    fontSize: 7.5,
    fontWeight: 700,
    color: DARK,
    flex: 1,
  },
  projectLink: {
    fontSize: 5.5,
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
    fontWeight: 600,
    padding: "1pt 3pt",
    borderRadius: 2,
  },

  // ── Footer ──────────────────────────────────────
  footer: {
    backgroundColor: DARK,
    color: GRAY_400,
    textAlign: "center",
    padding: 4,
    borderRadius: 3,
    fontSize: 6,
    marginTop: 10,
  },
  footerLink: {
    color: TEAL,
    textDecoration: "none",
    fontWeight: 600,
  },
});

// ── Helper: bullet highlights ─────────────────────
function Highlights({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <View style={{ marginTop: 2 }}>
      {items.map((h, i) => (
        <View key={i} style={{ flexDirection: "row", marginTop: 1 }}>
          <Text style={{ color: TEAL, fontSize: 5.5, marginRight: 3, marginTop: 0.5 }}>▸</Text>
          <Text style={styles.bulletItem}>{h}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Helper: contact item ──────────────────────────
function ContactItem({ label, text, href }: { label: string; text: string; href?: string }) {
  return (
    <View style={styles.contactCell}>
      <Text style={styles.contactLabel}>{label}</Text>
      {href ? (
        <Link src={href} style={styles.contactLink}>{text}</Link>
      ) : (
        <Text style={styles.contactText}>{text}</Text>
      )}
    </View>
  );
}

// ── Main Component ────────────────────────────────

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
  const photoUrl = `${baseUrl}/picture/abdulgofur-photo.png`;
  const productionProjects = projects.filter((p) => p.status === "production");

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>
        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <Image src={photoUrl} style={styles.headerPhoto} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>
              {personalInfo.name.toUpperCase()}
            </Text>
            <Text style={styles.headerRole}>{personalInfo.role}</Text>
            {/* Contact: 2-column grid, never wraps */}
            <View style={styles.contactGrid}>
              <ContactItem label="@" text={personalInfo.contact.email} />
              <ContactItem label="W" text="WhatsApp" href={`https://wa.me/${personalInfo.contact.phone.replace(/^0/, "62")}`} />
              <ContactItem label="L" text="Bandung, Indonesia" />
              <ContactItem label="G" text="github.com/nohypelabs" href={personalInfo.contact.github} />
              <ContactItem label="in" text="linkedin.com/in/abdul-gofur" href={personalInfo.contact.linkedin} />
              <ContactItem label="X" text="@nohypelabs" href={personalInfo.contact.twitter} />
            </View>
          </View>
        </View>

        {/* ── Two Column Grid ────────────────────── */}
        <View style={styles.grid}>
          {/* LEFT COLUMN */}
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitleFirst}>{t.cvProfile}</Text>
            <Text style={styles.profileText}>{cvData.profile[language]}</Text>

            <Text style={styles.sectionTitle}>
              {language === "en" ? "Technical Experience" : "Pengalaman Teknis"}
            </Text>
            {cvData.technicalExperience.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDesc}>{item.description[language]}</Text>
                {"highlights" in item && (item as any).highlights?.length > 0 && (
                  <Highlights items={(item as any).highlights} />
                )}
              </View>
            ))}

            <Text style={styles.sectionTitle}>
              {language === "en" ? "Other Experience" : "Pengalaman Lain"}
            </Text>
            {cvData.otherExperience.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDesc}>{item.description[language]}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>{t.cvEducation}</Text>
            {cvData.education.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={styles.entryDesc}>{item.description[language]}</Text>
                ) : null}
              </View>
            ))}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitleFirst}>{t.cvTechnicalSkills}</Text>
            {cvData.skillCategories.map((skill, i) => (
              <View key={i} style={styles.skillCard}>
                <Text style={styles.skillLabel}>{t[skill.labelKey]}</Text>
                <Text style={styles.skillList}>{skill.skills}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>{t.cvLanguages}</Text>
            <View style={styles.langRow}>
              {cvData.languages.map((item, i) => (
                <View key={i} style={styles.langItem}>
                  <Text style={styles.langBadge}>{item.level[language]}</Text>
                  <Text style={styles.langName}>{item.name[language]}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>{t.cvPortfolioProjects}</Text>
            {productionProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  {project.demo ? (
                    <Link src={project.demo} style={styles.projectLink}>
                      {new URL(project.demo).hostname}
                    </Link>
                  ) : null}
                </View>
                <View style={styles.tagRow}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle}>{t.cvBackground}</Text>
            {cvData.background.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={styles.entryDesc}>{item.description[language]}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* ── Footer ─────────────────────────────── */}
        <View style={styles.footer}>
          <Text>
            Portfolio:{" "}
            <Link src="https://abdulgofur-builder.vercel.app" style={styles.footerLink}>
              abdulgofur-builder.vercel.app
            </Link>{" "}
            | Created by {personalInfo.name} | 2026
          </Text>
        </View>
      </Page>
    </Document>
  );
}
