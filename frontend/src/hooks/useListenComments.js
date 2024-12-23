import { useCommentStore } from "@/store/commentStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export const useListenComments = () => {
   const {comments,setComments} = useCommentStore();
    useEffect(()=>{
        socket.on("newComment", (comment) => {
            setComments([comment,...comments, ]);
        });
        return () => {
            socket.off("newComment");
        };
    },[comments,setComments,socket]);

    return { socket };
};  