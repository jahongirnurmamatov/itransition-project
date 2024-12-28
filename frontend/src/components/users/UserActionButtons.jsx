import React from 'react'
import { Button } from '../ui/button'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useUsersStore } from '@/store/usersStore';
import { toast } from '@/hooks/use-toast';


const UserActionButtons = ({selectedUsers}) => {
  const {deleteUsers, blockUsers, unBlockUsers} = useUsersStore();
  
  const handleBlock = () => {
    blockUsers(selectedUsers);
    getAllUsers();
    toast({
      title: "Success",
      description: "Users blocked successfully",
    })
  }
  const handleUnlock = () => {
    unBlockUsers(selectedUsers);
    getAllUsers();
    toast({
      title: "Success",
      description: "Users unblocked successfully",
    })
  }
  const handleDelte = () => {
    deleteUsers(selectedUsers);
    getAllUsers();
    toast({
      title: "Success",
      description: "Users deleted successfully",
    })
  }
  return (
    <div className='flex gap-1'>
        <Button variant="outline"
        onClick={handleBlock}
        > 
            <FaLock className='text-red-500'/>
        </Button>
        <Button variant="outline"
          onClick={handleUnlock}
        > 
            <FaLockOpen  className='text-blue-500'/>
        </Button>
        <Button variant="outline"
          onClick={handleDelte}
        >
            <MdOutlineDeleteForever  className='text-red-400'/>
        </Button>
    </div>
  )
}

export default UserActionButtons