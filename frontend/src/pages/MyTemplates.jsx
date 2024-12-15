import { tableData } from '@/assets/data'
import TabelForms from '@/components/allForms/TableForms'
import React from 'react'

const MyTemplates = () => {
  return (
    <div className='w-full bg-slate-100 min-h-screen flex items-start justify-center'>
      <div className="mx-auto w-4/5 my-6">
        <h1 className='text-2xl font-bold text-center text-slate-800 mb-10'>MyTemplates</h1>
        <TabelForms  data={tableData} />
      </div>
    </div>
  )
}

export default MyTemplates