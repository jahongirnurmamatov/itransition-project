import ActivityTimeline from '@/components/profile/ActivityTimeline'
import TemplateCard from '@/components/profile/TemplateCard'
import UserCard from '@/components/profile/UserCard'
import { useUsersStore } from '@/store/usersStore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = ({userId}) => {
    let { id} = useParams();
    if(userId === undefined) userId = id;
    const {user,getUserById} = useUsersStore();

    useEffect(() => {
        getUserById(userId);
      }, [userId]);

  return (
    <div className='w-[100%] min-h-screen flex flex-col lg:px-10 md:px-10 px-2  '>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            <div className="flex items-center justify-center">
                <UserCard user={user}/>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
                <h1 className='text-primary font-bold text-2xl'>Recent activities</h1>
                <ActivityTimeline userId={userId}/>
            </div>
        </div>
        <div className="mt-10">
            <p className='text-2xl font-bold text-primary text-start my-10'>Recent Templates</p>
            <div className="flex justify-center">
                <TemplateCard templates={user?.templates}/>
            </div>
        </div>
    </div>
  )
}

export default Profile