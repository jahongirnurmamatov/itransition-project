import { useAuthStore } from '@/store/authStore';
import { useCommentStore } from '@/store/commentStore';
import { useTemplateStore } from '@/store/templateStore';
import React, { useEffect, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import WhoLiked from './WhoLiked';
import { useResponseStore } from '@/store/responseStore';
export const Interaction = ({templateId,setShowComments}) => {
    const {comments} = useCommentStore();
    const {user} = useAuthStore();
    const {likes,likeUnlike} = useTemplateStore();
    const {responses} = useResponseStore();

    const islikedTemplate = likes.some((like) => like?.userId === user?.id);

    const handleLikeUnlike =  () => {
      likeUnlike(templateId);
    }
  return (
    <div className='flex justify-between items-center my-1'>
        <div className="flex items-center justify-center gap-1">
        {
            !islikedTemplate ? <AiOutlineLike onClick={handleLikeUnlike} className='size-5 cursor-pointer hover:opacity-80 text-blue-800' />
             : <AiFillLike onClick={handleLikeUnlike} className='size-5 text-blue-800 cursor-pointer hover:opacity-80' />
        } 
          <WhoLiked />
        </div>
        <div className="flex items-center justify-center gap-3">
            <div 
            onClick={()=>setShowComments((prev)=>!prev)}
            className="flex items-center justify-center gap-2">
                {comments?.length>0 && <span className='text-gray-500  cursor-pointer hover:opacity-80 hover:underline text-sm'>{comments.length}
                   <span className='hidden md:inline'> Comments</span></span>}
                <FaCommentDots className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div>
            <div className="flex items-center justify-center gap-2">
                {responses?.length>0 && <span className='text-gray-500  cursor-pointer hover:opacity-80 hover:underline text-sm'>{responses?.length} 
                  <span className='hidden md:inline'> Responses</span></span>}
                <IoStatsChart className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div>
        </div>
    </div>
  )
}

const responses = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ];

