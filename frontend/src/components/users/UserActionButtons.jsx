import React from 'react'
import { Button } from '../ui/button'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useUsersStore } from '@/store/usersStore';
import { toast } from '@/hooks/use-toast';


const UserActionButtons = ({selectedUsers,d}) => {
  const {deleteUsers, blockUsers, unBlockUsers,getAllUsers} = useUsersStore();
 const handleBlock = async() => {
    if(selectedUsers.length === 0) {
      toast({
        title: d.error,
        variant: "destructive",
        description: d.pleaseSelect,
      })
    }else{
      await blockUsers(selectedUsers);
      toast({
        title: d.success,
        description: d.userBlocked,
      })
    }
  }
  const handleUnlock = async() => {
    if(selectedUsers.length === 0) {
      toast({
        title:d.error,
        variant: "destructive",
        description: d.pleaseSelect,
      })
    }else{
      await unBlockUsers(selectedUsers);
      toast({
        title: d.success,
        description: d.userUnblocked,
      })
    }
  }
  const handleDelte = async() => {
    if(selectedUsers.length === 0) {
      toast({
        title: d.error,
        variant: "destructive",
        description: d.pleaseSelect,
      })
    }else{
      await deleteUsers(selectedUsers);
      toast({
      title: d.success,
      variant:'outline',
      description: d.userDeleted,
    })
    }
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