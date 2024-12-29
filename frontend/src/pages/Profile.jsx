import UserCard from '@/components/profile/UserCard'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full min-h-screen flex'>
        <div className="flex-2">
            <UserCard />
        </div>
        <div className="flex-1"></div>
    </div>
  )
}

export default Profile