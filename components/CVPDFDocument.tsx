import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import type { cvData as cvDataType } from "@/lib/data/cvData";
import type { personalInfo as personalInfoType } from "@/lib/data/personalInfo";
import type { projects as projectsType } from "@/lib/data/projects";

// Use Helvetica (built-in) — reliable, no external fetch needed
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
    padding: "0.4in 0.5in",
  },

  // Header
  header: {
    backgroundColor: DARK,
    color: "white",
    padding: "14pt 16pt",
    borderRadius: 4,
    marginBottom: 10,
  },
  headerName: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerRole: {
    fontSize: 10,
    fontWeight: 300,
    color: TEAL,
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 7.5,
    color: GRAY_400,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.15)",
    borderTopStyle: "solid",
  },
  contactLabel: {
    color: TEAL,
    fontWeight: 600,
    marginRight: 2,
  },

  // Grid
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
  },

  // Section headers
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
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
  sectionTitleFirst: {
    fontSize: 10,
    fontWeight: 700,
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

  // Profile
  profileText: {
    fontSize: 8,
    color: GRAY_600,
    lineHeight: 1.5,
  },

  // Timeline entries
  entry: {
    borderLeftWidth: 2,
    borderLeftColor: BORDER,
    borderLeftStyle: "solid",
    paddingLeft: 10,
    marginBottom: 8,
  },
  entryYear: {
    fontSize: 7,
    fontWeight: 700,
    color: TEAL,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  entryTitle: {
    fontSize: 8.5,
    fontWeight: 600,
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

  // Skill cards
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
    fontWeight: 600,
    color: DARK,
  },
  skillList: {
    fontSize: 7,
    color: GRAY_500,
    lineHeight: 1.4,
  },

  // Languages
  langRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  langBadge: {
    backgroundColor: DARK,
    color: TEAL,
    fontSize: 6,
    fontWeight: 700,
    padding: "2pt 5pt",
    borderRadius: 10,
    textAlign: "center",
  },
  langName: {
    fontSize: 7,
    fontWeight: 600,
    color: "#334155",
    textAlign: "center",
  },
  langItem: {
    flex: 1,
    alignItems: "center",
  },

  // Project cards
  projectCard: {
    backgroundColor: BG_CARD,
    borderLeftWidth: 2.5,
    borderLeftColor: TEAL,
    borderLeftStyle: "solid",
    padding: "4pt 6pt",
    borderRadius: 3,
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 7.5,
    fontWeight: 600,
    color: DARK,
  },
  projectLink: {
    fontSize: 6,
    color: TEAL,
    textDecoration: "none",
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

  // Footer
  footer: {
    backgroundColor: DARK,
    color: GRAY_400,
    textAlign: "center",
    padding: 5,
    borderRadius: 4,
    fontSize: 6.5,
    marginTop: 12,
  },
  footerLink: {
    color: TEAL,
    textDecoration: "none",
    fontWeight: 600,
  },

  // Dot on timeline
  dot: {
    width: 6,
    height: 6,
    backgroundColor: TEAL,
    borderRadius: 3,
    position: "absolute",
    left: -13,
    top: 3,
  },
});

// Helper: render highlights
function Highlights({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <View style={{ marginTop: 3 }}>
      {items.map((h, i) => (
        <View key={i} style={{ flexDirection: "row", marginTop: 1 }}>
          <Text style={{ color: TEAL, fontSize: 6, marginRight: 3 }}>▸</Text>
          <Text style={styles.bulletItem}>{h}</Text>
        </View>
      ))}
    </View>
  );
}

interface Props {
  cvData: typeof cvDataType;
  personalInfo: typeof personalInfoType;
  projects: typeof projectsType;
  language: "en" | "id";
  translations: Record<string, string>;
}

export default function CVPDFDocument({
  cvData,
  personalInfo,
  projects,
  language,
  translations: t,
}: Props) {
  const productionProjects = projects.filter((p) => p.status === "production");

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>
            {personalInfo.name.toUpperCase()}
          </Text>
          <Text style={styles.headerRole}>{personalInfo.role}</Text>
          <View style={styles.contactRow}>
            <Text>
              <Text style={styles.contactLabel}>@</Text>
              {personalInfo.contact.email}
            </Text>
            <Text>
              <Text style={styles.contactLabel}>W</Text>WhatsApp
            </Text>
            <Text>
              <Text style={styles.contactLabel}>L</Text>Bandung, Indonesia
            </Text>
            <Text>
              <Text style={styles.contactLabel}>G</Text>
              <Link src={personalInfo.contact.github} style={{ color: GRAY_400, textDecoration: "none" }}>
                github.com/nohypelabs
              </Link>
            </Text>
            <Text>
              <Text style={styles.contactLabel}>in</Text>
              <Link src={personalInfo.contact.linkedin} style={{ color: GRAY_400, textDecoration: "none" }}>
                linkedin.com/in/abdul-gofur
              </Link>
            </Text>
            <Text>
              <Text style={styles.contactLabel}>X</Text>
              <Link src={personalInfo.contact.twitter} style={{ color: GRAY_400, textDecoration: "none" }}>
                @nohypelabs
              </Link>
            </Text>
          </View>
        </View>

        {/* Two Column Grid */}
        <View style={styles.grid}>
          {/* LEFT COLUMN */}
          <View style={styles.leftCol}>
            {/* Profile */}
            <Text style={styles.sectionTitleFirst}>{t.cvProfile}</Text>
            <Text style={styles.profileText}>{cvData.profile[language]}</Text>

            {/* Technical Experience */}
            <Text style={styles.sectionTitle}>
              {language === "en" ? "Technical Experience" : "Pengalaman Teknis"}
            </Text>
            {cvData.technicalExperience.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDesc}>
                  {item.description[language]}
                </Text>
                {"highlights" in item && (item as any).highlights?.length > 0 && (
                  <Highlights items={(item as any).highlights} />
                )}
              </View>
            ))}

            {/* Other Experience */}
            <Text style={styles.sectionTitle}>
              {language === "en" ? "Other Experience" : "Pengalaman Lain"}
            </Text>
            {cvData.otherExperience.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDesc}>
                  {item.description[language]}
                </Text>
              </View>
            ))}

            {/* Education */}
            <Text style={styles.sectionTitle}>{t.cvEducation}</Text>
            {cvData.education.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={styles.entryDesc}>
                    {item.description[language]}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.rightCol}>
            {/* Technical Skills */}
            <Text style={styles.sectionTitleFirst}>{t.cvTechnicalSkills}</Text>
            {cvData.skillCategories.map((skill, i) => (
              <View key={i} style={styles.skillCard}>
                <Text style={styles.skillLabel}>{t[skill.labelKey]}</Text>
                <Text style={styles.skillList}>{skill.skills}</Text>
              </View>
            ))}

            {/* Languages */}
            <Text style={styles.sectionTitle}>{t.cvLanguages}</Text>
            <View style={styles.langRow}>
              {cvData.languages.map((item, i) => (
                <View key={i} style={styles.langItem}>
                  <Text style={styles.langBadge}>{item.level[language]}</Text>
                  <Text style={styles.langName}>{item.name[language]}</Text>
                </View>
              ))}
            </View>

            {/* Portfolio Projects */}
            <Text style={styles.sectionTitle}>{t.cvPortfolioProjects}</Text>
            {productionProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  {project.demo ? (
                    <Link src={project.demo} style={styles.projectLink}>
                      {new URL(project.demo).hostname}
                    </Link>
                  ) : null}
                </View>
                <View style={styles.tagRow}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <Text key={tag} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
              </View>
            ))}

            {/* Background */}
            <Text style={styles.sectionTitle}>{t.cvBackground}</Text>
            {cvData.background.map((item, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryYear}>{item.year}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
                {item.description[language] ? (
                  <Text style={styles.entryDesc}>
                    {item.description[language]}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Portfolio:{" "}
            <Link src="https://nohypelabs.vercel.app" style={styles.footerLink}>
              nohypelabs.vercel.app
            </Link>{" "}
            | Created by {personalInfo.name} | 2026
          </Text>
        </View>
      </Page>
    </Document>
  );
}
