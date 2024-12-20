import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { TextField } from '@mui/material';
const CommentBox = () => {
    const {user} = useAuthStore();

  return (
    <div className='flex gap-3 items-start justify-start'>
        
         <div className="mt-2">
            {
                user.avatar ? <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDyVnOBlwkzudE1gDEXFmGKCM-Z4dH6_XfVMBMrpGmVcdj81LQMv13G19VhE7IN7fI47o&usqp=CAU"} alt={user.username} className='size-6 rounded-full' /> 
                : <FaCircleUser className='size-6 text-gray-500' />
            }
        </div>   
        <TextField
            className='w-2/3'
            id="outlined-multiline-static"
            label="Comment here"
            multiline
            rows={2}
            placeholder="Write a comment..."
            />
    </div>
  )
}

export default CommentBox