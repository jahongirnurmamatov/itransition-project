import React from 'react'
import { Button } from '../ui/button'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";


const UserActionButtons = () => {
  return (
    <div className='flex gap-1'>
        <Button variant="outline"> 
            <FaLock className='text-red-500'/>
        </Button>
        <Button variant="outline"> 
            <FaLockOpen  className='text-blue-500'/>
        </Button>
        <Button variant="outline">
            <MdOutlineDeleteForever  className='text-red-400'/>
        </Button>
    </div>
  )
}

export default UserActionButtons