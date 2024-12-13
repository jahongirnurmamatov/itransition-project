import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const CreateTemplate = () => {
  return (
    <div className="w-full bg-slate-100 flex items-start justify-center">
      <div className="mx-auto w-4/5">
        <h1 className='text-2xl font-bold text-center'>Untitled Form</h1>
        <div className="flex flex-col gap-4 my-5">
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question1 </p>
            <input type="text" placeholder="Type your question here" className="w-1/2 p-2" />
          </div>
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question2 </p>
            <select name="mutlitple" id="">
              <option value="">Option 1</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
              <option value="">Option 4</option>
            </select>
          </div>
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
          <div className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md">
            <p className='text-lg font-semibold font-sans'>Question 4. Select mutltiple options</p>
            <FormControlLabel  control={<Checkbox />} label="Option 1" />
            <FormControlLabel  control={<Checkbox />} label="Option 2" />
            <FormControlLabel  control={<Checkbox />} label="Option 3" />
          </div>



        </div>
      </div>
    </div>
  )
}

export default CreateTemplate