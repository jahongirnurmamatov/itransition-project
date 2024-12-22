import { useAuthStore } from '@/store/authStore';
import { useCommentStore } from '@/store/commentStore';
import React, { useEffect } from 'react'
import { FaCircleUser } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import { formatDistanceToNow } from 'date-fns';
import { EditDeleteDropDown } from './EditDeleteDropDown';


const Comments = () => {
    const {user} = useAuthStore();
    const { templateId } = useParams();
    const {getComments,isCommentLoading,commentError,comments} = useCommentStore();

    useEffect(() => {
      getComments(templateId);
    },[templateId,getComments]);
    if(isCommentLoading){
        return <Loading />;
    }
    if(commentError){
      return <div className='text-center text-red-500'>{commentError}</div>
    }
  return (
    <div className="my-4">
        <h1 className='text-xl font-bold'>Comments</h1>
        <div className='flex flex-col items-start justify-start gap-4 my-5 '>
        {
            comments.map((comment,index) =>(
                <div key={index} className='flex  justify-start gap-3 '>
                    <div className="flex">
                    {
                        comment?.user?.avatar ? <img src={comment?.user?.avatar} alt={comment?.user.username} className='size-6 rounded-full' /> 
                        : <FaCircleUser className='size-6 text-gray-500' />
                    }
                    </div>
                    <div className='flex  rounded-lg bg-slate-200 py-2 px-4 min-w-100px] items-center gap-10 justify-between'>
                        <div className="flex flex-col items-start justify-start gap-0">
                          <span className='font-bold'>{comment?.user?.username}</span>
                          <span>{comment.content}</span>
                          <p className='text-sm text-gray-500 text-end'>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</p>
                        </div>
                        {
                          comment.userId===user.id && <EditDeleteDropDown />
                        }
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