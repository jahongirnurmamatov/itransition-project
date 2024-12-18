import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand'

export const useTemplateStore = create((set) => ({
    isLoading:false,
    forms: [],
    title: '',
    topic: '',
    image: '',
    template: null,
    previewImg: '',
    setPreviewImg: (previewImg) => set({ previewImg }),
    setTemplate: (template) => set({ template }),
    setForms: (forms) => set({ forms }),
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setImage: (image) => set({ image }),

    createTemplate: () => {
        const template = {
            title,
            topic,
            image,
            forms,
        };
        try {
            set({isLoading:true, error:null});
            const res = axiosInstance.post('/template/create-template', template);
            set({template:res.data.template, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
        
    },

}))