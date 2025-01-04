import translations from "@/components/languageProvider/translations";
import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  language: "en", 
  dictionary: translations.en,
  setLanguage: (language) => {
    set({
      language,
      dictionary: translations[language],
    });
    localStorage.setItem("language", language); 
  },
  initializeLanguage: () => {
    const storedLanguage = localStorage.getItem("language") || "en";
    set({
      language: storedLanguage,
      dictionary: translations[storedLanguage],
    });
  },
}));
