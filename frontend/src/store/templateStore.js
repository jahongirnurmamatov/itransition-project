import { SheetDescription } from '@/components/ui/sheet';
import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand'

export const useTemplateStore = create((set,get) => ({
    isLoading:false,
    forms: [],
    title: '',
    topic: '',
    image: '',
    templates: [],
    previewImg: '',
    description: '',
    tags: [],
    imageUrl:'',
    setImageURL:(imageUrl) => set({ imageUrl }),
    setTags: (tags) => set({ tags }),
    setDescription: (description) => set({ description }),
    setPreviewImg: (previewImg) => set({ previewImg }),
    setTemplates: (templates) => set({ templates}),
    setForms: (forms) => set({ forms }),
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setImage: (image) => set({ image }),

    createTemplate: () => {
        const { title, topic, description, imageUrl, forms, tags } = get();
        const template = {
            title,
            topic,
            description,
            imageUrl,
            forms,
            tags,
        };
        try {
            set({isLoading:true, error:null});
            const res = axiosInstance.post('/template/create', template);
            set({ isLoading:false});
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
    getTemplateById: async (templateId) => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosInstance.get(`/template/${templateId}`);
          const { title, topic, description, imageUrl, tags, questions } = res.data.template;
          const forms = questions.map((q) => ({
            id: q.id,
            type: q.type,
            label: q.label,
            description: q.description,
            required: q.required,
            options: q.options.map((o) => o.value), 
            orderIndex: q.orderIndex,
          }));
          set({
            title,
            topic,
            description,
            imageUrl,
            tags,
            forms,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch template.', isLoading: false });
          throw error;
        }
      },
    getMyTemplates: async () => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosInstance.get('/template/get-my-templates');
          set({ templates: res.data.templates, isLoading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch templates.', isLoading: false });
          throw error;
        }
      },

}))