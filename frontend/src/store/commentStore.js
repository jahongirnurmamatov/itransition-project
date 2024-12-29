import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useCommentStore = create((set,get) => ({
    comments: [],
    isCommentLoading: false,
    isCommentAdding:false, 
    commentError: null,
    setComments: (newComments) => set({ comments: newComments }),

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
            set({isCommentAdding: true, commentError: null});
            const res = await axiosInstance.post(`/comment/${templateID}/add-comment`, {content});
            await get().getComments(templateID);
            set({ isCommentAdding: false});
        } catch (error) {
            set({commentError: error.response.data.message, isCommentAdding: false});
        }
    },
    deleteComment: async(commentId)=>{
        try {
            set({ commentError: null});
            const res = await axiosInstance.delete(`/comment/${commentId}/delete`);
            const currentComments = get().comments;
            set({comments: currentComments.filter(comment => comment.id !== commentId)});
        } catch (error) {
            set({commentError: error.response.data.message});
        }   
    },
    editComment: async(commentId, content)=>{
        try {
            set({ commentError: null});
            const res = await axiosInstance.put(`/comment/${commentId}/edit`, {content});
            const currentComments = get().comments;
            set({comments: currentComments.map(comment => comment.id === commentId ? res.data.comment : comment)});
        } catch (error) {
            set({commentError: error.response.data.message});
        }
    }
}))

