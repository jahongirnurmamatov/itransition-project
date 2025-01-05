import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCommentStore } from '@/store/commentStore';
import { TbSend2 } from "react-icons/tb";
import { useLanguageStore } from '@/store/languageStore';
import { toast } from '@/hooks/use-toast';

const CommentBox = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { templateId } = useParams();
  const [content, setContent] = useState("");
  const { addComment,isCommentAdding } = useCommentStore();

  const handleCommentSubmit = (e) => {
   if(!isAuthenticated){
    toast({
      variant: "destructive",
      title: d.error,
      description: d.pleaseLoginMessage,
    })
    return;
   }else{
    e.preventDefault();
    if (content.trim() === "") return; 
    addComment(templateId, content);
    setContent("");
   }
  };
  const {dictionary:d} = useLanguageStore();

  return (
    <div className="flex gap-3 items-start justify-start">
      <div className="mt-2">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaCircleUser className="text-gray-500 w-10 h-10" />
        )}
      </div>
      <form
        className="relative flex-grow"
        onSubmit={handleCommentSubmit}
      >
        <div className="relative">
          <TextField
            className="w-full bg-primary-foreground text-white"
            id="outlined-multiline-static"
            label={d.commentHere}
            multiline
            rows={2}
            placeholder={d.writeComment}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              "& .MuiInputBase-input": { 
                color: "#6b7280",
              },
            }}
          />
          <button
            type="submit"
            className="absolute top-3/4 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-500"
          >
            {isCommentAdding ? (<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>) 
            : <TbSend2 className="w-6 h-6" />}
           
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
