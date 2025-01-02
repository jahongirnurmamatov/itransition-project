import { useCommentStore } from "@/store/commentStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://itransition-project-is0a.onrender.com/");

export const useListenComments = () => {
   const {comments,setComments} = useCommentStore();
    useEffect(()=>{
        socket.on("newComment", (comment) => {
            setComments([comment,...comments, ]);
        });
        socket.on("deleteComment", (commentId) => {
            console.log("deleteComment", commentId);
            console.log(comments)
            setComments(comments.filter(comment => comment.id !== commentId));

        });
        socket.on("editComment", (editedComment,commentId) => {
            setComments(comments.map(comment => comment.id === commentId ? editedComment : comment));
        })
        return () => {
            socket.off("newComment");
            socket.off("deleteComment");
        };
    },[comments,setComments,socket]);

    return { socket };
};  