import UsersTable from '@/components/users/UsersTable'
import { useLanguageStore } from '@/store/languageStore'
import React from 'react'

const Users = () => {
  const {dictionary:d} = useLanguageStore()
  return (
    <div className='w-full h-full  flex items-start justify-center'> 
        <div className="mx-auto w-[90%] my-6">
            <h1 className='text-2xl font-bold text-center text-primary mb-10'>{d.allUsers}</h1>
            <UsersTable d={d}/>
      </div>
    </div>
  )
}

export default Users