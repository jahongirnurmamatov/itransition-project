import { DialogDemo } from '@/components/createForm/AddQuestion'
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
  const [questionType,setQuestionType]=useState('');

  useEffect(()=>{
    console.log(questionType)
   },[questionType])

  return (
    <div className="w-full bg-slate-100 flex items-start justify-center">
      <div className="mx-auto w-4/5 my-6">
        <h1 className='text-2xl font-bold text-center'>Untitled Form</h1>
        <div className="flex flex-col gap-4 my-5">
          {/* Input */}
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question1 </p>
            <input type="text" placeholder="Type your question here" className="w-1/2 p-2" />
          </div>
          {/* Select */}
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question2 </p>
            <Select onValueChange={(value)=>setQuestionType(value)}>
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
          </div>
          {/* Checkbox and Radio button */}
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <FormControl>
              <p className='text-lg font-semibold font-sans'>Gender</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group">
                    <FormControlLabel value="female" control={<Radio  />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
          </div>
          {/* Checkbox */}
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question 4. Select mutltiple options</p>
            <div className="flex flex-col gap-1">
            <FormControlLabel  control={<Checkbox />} label="Option 1" />
            <FormControlLabel  control={<Checkbox />} label="Option 2" />
            <FormControlLabel  control={<Checkbox />} label="Option 3" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
        <DialogDemo questionType={questionType} setQuestionType={setQuestionType} /> 
        </div>
      </div>
    </div>
  )
}

export default CreateTemplate