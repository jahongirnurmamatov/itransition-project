import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckboxForm = () => {
  return (
    <div className="flex flex-col gap-1">
        <FormControlLabel  control={<Checkbox />} label="Option 1" />
        <FormControlLabel  control={<Checkbox />} label="Option 2" />
        <FormControlLabel  control={<Checkbox />} label="Option 3" />
  </div>
  )
}

export default CheckboxForm