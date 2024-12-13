import { DialogDemo } from '@/components/createForm/AddQuestion'
import CheckboxForm from '@/components/createForm/CheckboxForm'
import ImageUpload from '@/components/createForm/ImageUpload'
import RadioForm from '@/components/createForm/RadioFrom'
import SelectForm from '@/components/createForm/SelectForm'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const CreateTemplate = () => {
  const [formType,setFormType]=useState('');
  const [forms, setForms] = useState([]);

   const addForm = (formType)=>{
    console.log(formType)
    const newForm = {
      type: formType,
      label : 'Untitled label',
      options : [],
      required : false,
      description : 'Write small description here...',
      name : '',
      id : '',
    }
    setForms([...forms,newForm])
   }

  return (
    <div className="w-full bg-slate-100 min-h-screen flex items-start justify-center">
      <div className="mx-auto w-4/5 my-6">
        <h1 className='text-2xl font-bold text-center'>Untitled Form</h1>
        <div className="flex flex-col gap-4 my-5">
          {
            forms.map((form,index)=>(
              <div key={index} className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
                 <p className='text-lg font-semibold font-sans'>{form.label} </p>
                 {
                   (() => {
                    switch (form.type) {
                      case 'header':
                        return <></>
                      case 'number':
                        return <Input type="number" placeholder="Type a number here" className="w-1/3 p-2" />;
                      case 'checkbox':
                        return <CheckboxForm />      
                      case 'radio-group':
                        return (
                          <RadioForm />
                        );
                      case 'textarea':
                        return <textarea placeholder="Type your text here" className="w-1/2 p-2" rows="4" />;
                      case 'select':
                        return <SelectForm />
                      case 'image':
                        return <ImageUpload/>
                      default:
                       return <p>Unknown question type.</p>;
                    }
                  })()
                 }
              </div>
          ))}     
        </div>
        <div className="flex items-center justify-center">
          <DialogDemo addForm={addForm} setFormType={setFormType} formType={formType}/> 
        </div>
      </div>
    </div>
  )
}

export default CreateTemplate