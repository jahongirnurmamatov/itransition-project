import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useCommentStore = create((set) => ({
    comments: [],
    isCommentLoading: false,
    commentError: null,

    getComments: async(templateID)=>{ 
        try {
            set({isCommentLoading: true, commentError: null});
            const res = await axiosInstance.get(`/comment/${templateID}/get-comments`);
            set({comments: res.data.comments, isCommentLoading: false});
        } catch (error) {
            set({commentError: error.response.data.message, isCommentLoading: false});
        }
    },
    addComment: async(templateID, content)=>{
        try {
            set({isCommentLoading: true, commentError: null});
            const res = await axiosInstance.post(`/comment/${templateID}/add-comment`, {content});
            set({comments: [...comments, res.data.comment], isCommentLoading: false});
        } catch (error) {
            set({commentError: error.response.data.message, isCommentLoading: false});
        }
    }
}))

