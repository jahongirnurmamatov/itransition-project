import { useAuthStore } from '@/store/authStore';
import React from 'react'
import { FaCircleUser } from 'react-icons/fa6';

const Comments = () => {
    const {user} = useAuthStore();
  return (
    <div className="my-4">
        <h1 className='text-xl font-bold'>Comments</h1>
        <div className='flex flex-col items-start justify-start gap-2 my-5 '>
        {
            comments.map((comment,index) =>(
                <div key={index} className='flex  justify-start gap-2 '>
                    <div className="flex">
                    {
                        user?.avatar ? <img src={user.avatar} alt={user.username} className='size-6 rounded-full' /> 
                        : <FaCircleUser className='size-6 text-gray-500' />
                    }
                    </div>
                    <div className='flex flex-col items-start justify-start gap-1 rounded-lg bg-slate-200 py-2 px-4'>
                        <span className='font-bold'>{comment.username}</span>
                        <span>{comment.commentText}</span>
                    </div>  
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Comments

const comments = [
    {
      username: "john Doe",
      photoLink: "https://example.com/user1.jpg",
      commentText: "This is a great post! I really enjoyed reading it."
    },
    {
      username: "jennysmith",
      photoLink: "https://example.com/user2.jpg",
      commentText: "I have a question about the third paragraph. Can you elaborate on that?"
    },
    {
      username: "sanjar",
      photoLink: "https://example.com/user3.jpg",
      commentText: "I agree with user1. This is a well-written and informative post."
    },
    {
      username: "umidnizamov",
      photoLink: "https://example.com/user4.jpg",
      commentText: "I found this post to be very helpful. Thank you for sharing your knowledge."
    },
    {
      username: "user5",
      photoLink: "https://example.com/user5.jpg",
      commentText: "I have a suggestion for improving this post. You could add a section on..."
    },
    {
      username: "melgibson",
      photoLink: "https://example.com/user5.jpg",
      commentText: "I have a suggestion for improving this post. You could add a section on. I have a suggestion  for improving this post. You could add a section on. I have a suggestion for improving this post. You could add a section on ..."
    }
  ];