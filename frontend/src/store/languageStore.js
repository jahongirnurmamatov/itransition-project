import translations from "@/components/languageProvider/translations";
import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  language: localStorage.getItem("language") ||"en",
  dictionary: translations.en,
  setLanguage: (language) =>
    set({ 
      language, 
      dictionary: translations[language],
    }),
}));
