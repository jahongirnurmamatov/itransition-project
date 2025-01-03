import TabelForms from '@/components/allForms/TableForms'
import Loading from '@/components/loading/Loading'
import { useAuthStore } from '@/store/authStore'
import { useTemplateStore } from '@/store/templateStore'
import React from 'react'

const AllTemplates = () => {
  const {isLoading,error} = useTemplateStore();
  const {authUser} = useAuthStore();

  if(isLoading){
    <Loading />
  }
  if(error){
    return <div>{error}</div>
  }
  return (
    <div className='w-full min-h-screen flex items-start justify-center'>
      <div className="mx-auto w-[90%] my-6">
        <h1 className='text-2xl font-bold text-center text-primary mb-10'>All Templates</h1>
        <TabelForms   />
      </div>
    </div>
  )
}

export default AllTemplates