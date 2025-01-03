import {create} from 'zustand';

export const useLanguageStore = create((set) => ({
    language: 'en',
    setLanguage: (language) => set({ language }),
}));