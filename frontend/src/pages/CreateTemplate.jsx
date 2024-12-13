import { DialogDemo } from '@/components/createForm/AddQuestion'
import ImageUpload from '@/components/createForm/ImageUpload'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'

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
                        return <input type="number" placeholder="Type a number here" className="w-1/2 p-2" />;
                      case 'checkbox':
                        return  <div className="flex flex-col gap-1">
                                  <FormControlLabel  control={<Checkbox />} label="Option 1" />
                                  <FormControlLabel  control={<Checkbox />} label="Option 2" />
                                  <FormControlLabel  control={<Checkbox />} label="Option 3" />
                                </div>
                      
                      case 'radio-group':
                        return (
                          <FormControl>
                            <RadioGroup>
                              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                              <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                            </RadioGroup>
                          </FormControl>
                        );
                      case 'textarea':
                        return <textarea placeholder="Type your text here" className="w-1/2 p-2" rows="4" />;
                      case 'select':
                        return <Select onValueChange={(value)=>setQuestionType(value)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup  >
                                     <SelectItem value="header" >Header</SelectItem>
                                      <SelectItem value="paragraph">Paragraph</SelectItem>
                                     <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="radio-group">Radio-group</SelectItem>
                                     <SelectItem value="textarea">Textarea</SelectItem>
                                   </SelectGroup>
                                 </SelectContent>
                              </Select>
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