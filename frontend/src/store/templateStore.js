import { SheetDescription } from '@/components/ui/sheet';
import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand'

export const useTemplateStore = create((set,get) => ({
    isLoading:false,
    forms: [],
    title: '',
    topic: '',
    image: '',
    template: null,
    previewImg: '',
    description: '',
    tags: [],
    imageUrl:'',
    setImageURL:(imageUrl) => set({ imageUrl }),
    setTags: (tags) => set({ tags }),
    setDescription: (description) => set({ description }),
    setPreviewImg: (previewImg) => set({ previewImg }),
    setTemplate: (template) => set({ template }),
    setForms: (forms) => set({ forms }),
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setImage: (image) => set({ image }),

    createTemplate: () => {
        const { title, topic, description, image, forms, tags } = get();
        const template = {
            title,
            topic,
            description,
            image,
            forms,
            tags,
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
    uploadToCloudinary: async (file) => {
        try {
          set({isLoading:true, error:null});
          const res = await axiosInstance.post('/upload', file)
          set({imageUrl:res.data.imgUrl, isLoading:false});
        } catch (error) {
          console.error('Error uploading to Cloud', error);
          set({error:error.response.data.message, isLoading:false});
          throw error;
        }
      },

}))