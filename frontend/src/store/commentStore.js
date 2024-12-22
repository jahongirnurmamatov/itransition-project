import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useCommentStore = create((set) => ({
    comments: [],
    isCommentLoading,
    commentError: null,
    setCommentErro: (commentError) => set({commentError: commentError}),
    setIsCommentLoading:(isCommentLoading) => set({isCommentLoading: isCommentLoading}),
    setComments: (comments) => set({comments: comments}),

    getComments: async()=>{ 
        try {
            set({isCommentLoading: true, commentError: null});
            const res = await axiosInstance.get('/comment/get-comments');
            set({comments: res.data.comments, isCommentLoading: false});
        } catch (error) {
            set({commentError: error.response.data.message, isCommentLoading: false});
        }
    }
}))

