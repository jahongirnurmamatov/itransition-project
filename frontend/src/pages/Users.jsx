import UsersTable from '@/components/users/UsersTable'
import React from 'react'

const Users = () => {
  return (
    <div className='w-full h-full bg-slate-100 flex items-start justify-center'> 
        <div className="mx-auto w-[90%] my-6">
            <h1 className='text-2xl font-bold text-center text-slate-800 mb-10'>All Users</h1>
            <UsersTable />
      </div>
    </div>
  )
}

export default Users