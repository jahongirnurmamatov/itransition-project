import { toast } from '@/hooks/use-toast';
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
    userId: null,
    likes : [],
    visibility: "PUBLIC",
    sharedWith: [],
    totalPages: 1,
    setSharedWith: (sharedWith) => set({ sharedWith }),
    setVisibility: (visibility) => set({ visibility }),
    setImageURL:(imageUrl) => set({ imageUrl }),
    setTags: (tags) => set({ tags }),
    setDescription: (description) => set({ description }),
    setPreviewImg: (previewImg) => set({ previewImg }),
    setTemplates: (templates) => set({ templates}),
    setForms: (forms) => set({ forms }),
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setImage: (image) => set({ image }),

    createTemplate: async () => {
        const { title, topic, description, imageUrl, forms, tags,visibility,sharedWith } = get();
        const template = {
            title,
            topic,
            description,
            imageUrl,
            forms,
            tags,
            sharedWith,
            visibility,
        };
        try {
            set({isLoading:true, error:null});
            const res = await axiosInstance.post('/template/create', template);
            await get().getMyTemplates();
            set({ isLoading:false});
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to create template.', isLoading: false });
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
          const { title, topic, description, imageUrl, tags, questions,userId,likes,visibility,sharedWith  } = res.data.template;
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
            userId,
            likes,
            visibility,
            sharedWith
          });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch template.', isLoading: false });
          throw error;
        }
      },

    getMyTemplates: async (searchKey,page, titleOrder,createdAtOrder, topicOrder,userId ) => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosInstance.get('/template/get-templates',{
            params: {
              searchKey,              
              page,
              titleOrder,
              createdAtOrder,
              topicOrder,
              userId
            },
          });
          set({ templates: res.data.templates, isLoading: false, totalPages: res.data.totalPages });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch templates.', isLoading: false });
          throw error;
        }
      },
    likeUnlike: async (templateId) => {
        try {
          set({  error: null });
          const res = await axiosInstance.post(`/template/${templateId}/like-unlike`);
          set({ likes: res.data.template.likes, isLoading: false });
        } catch (error) { 
          set({ error: error.response?.data?.message || 'Failed to like/unlike template.' });
          throw error;
        }
      },

    getPopularTemplates: async () => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosInstance.get('/template/popular');
          set({ templates: res.data.templates, isLoading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch popular templates.', isLoading: false });
          throw error;
        }
      },
    deleteManyTemplates: async (templateIds) => {
        try {
          set({ isLoading: true, error: null });
          const res = await axiosInstance.delete('/template/delete-templates', { data: { templateIds } });
          toast({
            title: 'Success',
            description: res.data.message,
          })
          await get().getMyTemplates();
          set({ isLoading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to delete templates.', isLoading: false });
          throw error;
        }
    },
}))