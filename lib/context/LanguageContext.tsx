"use client";

import { createContext, useContext, useState, useSyncExternalStore, ReactNode } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const noopSubscribe = () => () => {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageState, setLanguageState] = useState<Language>("en");

  // Read persisted language from localStorage without an effect
  const stored = useSyncExternalStore(
    noopSubscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem("language") : null),
    () => null
  );

  const language: Language = stored === "en" || stored === "id" ? stored : languageState;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
