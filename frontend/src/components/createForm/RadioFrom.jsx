import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioForm = () => {
  return (
    <FormControl>
        <RadioGroup>
        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
     </RadioGroup>
 </FormControl>
  )
}

export default RadioForm