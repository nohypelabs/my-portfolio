import { describe, it, expect } from "vitest";
import { projects } from "@/lib/data/projects";
import { personalInfo } from "@/lib/data/personalInfo";

describe("Portfolio Data Integrity", () => {
  describe("personalInfo", () => {
    it("has required fields", () => {
      expect(personalInfo.name).toBeTruthy();
      expect(personalInfo.role).toBeTruthy();
      expect(personalInfo.contact.email).toContain("@");
      expect(personalInfo.contact.github).toMatch(/^https?:\/\//);
      expect(personalInfo.contact.linkedin).toMatch(/^https?:\/\//);
    });

    it("has skills in each category", () => {
      const { skills } = personalInfo;
      expect(skills.frontend.length).toBeGreaterThan(0);
      expect(skills.backend.length).toBeGreaterThan(0);
      expect(skills.database.length).toBeGreaterThan(0);
      expect(skills.tools.length).toBeGreaterThan(0);
    });
  });

  describe("projects", () => {
    it("has at least 1 project", () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it("every project has required fields", () => {
      for (const p of projects) {
        expect(p.id).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.shortDescription).toBeTruthy();
        expect(p.image).toBeTruthy();
        expect(p.tags.length).toBeGreaterThan(0);
        expect(["production", "development", "archived"]).toContain(p.status);
      }
    });

    it("every project has tech stack", () => {
      for (const p of projects) {
        expect(p.techStack.length).toBeGreaterThan(0);
        for (const ts of p.techStack) {
          expect(ts.category).toBeTruthy();
          expect(ts.technologies.length).toBeGreaterThan(0);
        }
      }
    });

    it("production projects have demo links", () => {
      const prodProjects = projects.filter((p) => p.status === "production");
      for (const p of prodProjects) {
        expect(p.demo).toBeTruthy();
        expect(p.demo).toMatch(/^https?:\/\//);
      }
    });

    it("project IDs are unique", () => {
      const ids = projects.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
