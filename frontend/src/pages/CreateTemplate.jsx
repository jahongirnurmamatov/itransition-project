import { DialogDemo } from '@/components/createForm/AddQuestion'
import CheckboxForm from '@/components/createForm/CheckboxForm'
import ImageUpload from '@/components/createForm/ImageUpload'
import RadioForm from '@/components/createForm/RadioFrom'
import SelectForm from '@/components/createForm/SelectForm'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const CreateTemplate = () => {
  const [formType,setFormType]=useState('');
  const [forms, setForms] = useState([]);
  const [editing,setEditing]=useState(false);

   const addForm = (formType)=>{
    const newForm = {
      id: uuidv4(),
      type: formType,
      label : 'Untitled label',
      options : [],
      required : false,
      description : 'Write small description here...'
    }
    setForms([...forms,newForm])
   }
   const editLabel = (id, label) => {
    const allforms = [...forms];
    const index = forms.findIndex((form) => form.id === id);
    if(index!==-1){
      allforms[index].label = label;
      setForms(allforms);
    }
  }

   const editDescription = (id, description) => {
    const allforms = [...forms];
    const index = forms.findIndex((form) => form.id === id);
    if(index!==-1){
      allforms[index].description = description;
      setForms(allforms);
    }
  }

  return (
    <div className="w-full bg-slate-100 min-h-screen flex items-start justify-center">
      <div className="mx-auto w-4/5 my-6">
        <h1 className='text-2xl font-bold text-center'>Untitled Form</h1>
        <div className="flex flex-col gap-4 my-5">
          {
            forms.map((form,index)=>(
              <div key={index} className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
                {editing ? (
                  <Input onBlur={()=>setEditing(false)}  type="text" value={form.label} onChange={(e) => editLabel(form.id, e.target.value)} className="w-2/3 p-2" />
                ) : (
                 <p onClick={()=>setEditing(true)} onBlur={()=>setEditing(false)} className='text-lg font-semibold font-sans'>{form.label} </p>   
                )}
                {editing ? (
                  <Input onBlur={()=>setEditing(false)}  type="text" value={form.description} onChange={(e) => editDescription(form.id, e.target.value)} className="w-2/3 p-2" />  
                ) : (
                  <p onClick={()=>setEditing(true)}   className='text-sm font-light text-gray-500'>{form.description}</p>
                )}

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