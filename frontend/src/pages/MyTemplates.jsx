import { tableData } from '@/assets/data'
import TabelForms from '@/components/allForms/TableForms'
import Loading from '@/components/loading/Loading'
import { useTemplateStore } from '@/store/templateStore'
import React from 'react'

const MyTemplates = () => {
  const {isLoading,error} = useTemplateStore();

  if(isLoading){
    <Loading />
  }
  if(error){
    return <div>{error}</div>
  }
  return (
    <div className='w-full min-h-screen flex items-start justify-center'>
      <div className="mx-auto w-4/5 my-6">
        <h1 className='text-2xl font-bold text-center text-primary mb-10'>MyTemplates</h1>
        <TabelForms  data={tableData} />
      </div>
    </div>
  )
}

export default MyTemplates