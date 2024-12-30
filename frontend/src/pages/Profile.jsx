import { tableData } from '@/assets/data'
import CardCarousel from '@/components/landingPage/CardCarousel'
import ActivityTimeline from '@/components/profile/ActivityTimeline'
import TemplateCard from '@/components/profile/TemplateCard'
import UserCard from '@/components/profile/UserCard'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-[100%] min-h-screen flex flex-col lg:px-20 md:px-10 px-2  '>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            <div className="flex items-center justify-center">
                <UserCard />
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
                <h1 className='text-primary font-bold text-2xl'>Recent activities</h1>
                <ActivityTimeline />
            </div>
        </div>
        <div className="mt-10">
            <p className='text-2xl font-bold text-primary text-start my-10'>Recent Templates</p>
            <div className="flex justify-center">
                <TemplateCard />
            </div>
        </div>
    </div>
  )
}

export default Profile