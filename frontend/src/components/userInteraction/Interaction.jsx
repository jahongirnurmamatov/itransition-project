import React, { useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
export const Interaction = () => {
    const [isliked,setIsliked] = useState(false);


  return (
    <div className='flex justify-between items-center my-1'>
        <div className="flex items-center justify-center gap-1">
        {
            isliked ? <AiOutlineLike onClick={() => setIsliked(!isliked)} className='size-5 cursor-pointer hover:opacity-80 text-blue-800' />
             : <AiFillLike onClick={() => setIsliked(!isliked)} className='size-5 text-blue-800 cursor-pointer hover:opacity-80' />
        } 
        <span className='text-gray-500 text-sm'>20 Likes</span>
        </div>
        <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-1">
                {comments.length>0 && <span className='text-gray-500  cursor-pointer hover:opacity-80 hover:underline text-sm'>{comments.length} Comments</span>}
                <FaCommentDots className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div>
            <div className="flex items-center justify-center gap-1">
                {responses.length>0 && <span className='text-gray-500  cursor-pointer hover:opacity-80 hover:underline text-sm'>{responses.length} Responses</span>}
                <IoStatsChart className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div>
        </div>
    </div>
  )
}


const comments = [
    {
      username: "user1",
      photoLink: "https://example.com/user1.jpg",
      commentText: "This is a great post! I really enjoyed reading it."
    },
    {
      username: "user2",
      photoLink: "https://example.com/user2.jpg",
      commentText: "I have a question about the third paragraph. Can you elaborate on that?"
    },
    {
      username: "user3",
      photoLink: "https://example.com/user3.jpg",
      commentText: "I agree with user1. This is a well-written and informative post."
    },
    {
      username: "user4",
      photoLink: "https://example.com/user4.jpg",
      commentText: "I found this post to be very helpful. Thank you for sharing your knowledge."
    },
    {
      username: "user5",
      photoLink: "https://example.com/user5.jpg",
      commentText: "I have a suggestion for improving this post. You could add a section on..."
    }
  ];

const responses = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ];

