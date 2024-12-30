import ActivityTimeline from '@/components/profile/ActivityTimeline'
import UserCard from '@/components/profile/UserCard'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full min-h-screen flex px-20'>
        <div className="flex-2">
            <UserCard />
        </div>
        <div className="flex-1">
            <ActivityTimeline />
        </div>
    </div>
  )
}

export default Profile