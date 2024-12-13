import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function SelectForm() {
  return (
    <Select >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
        </SelectTrigger>
            <SelectContent>
               <SelectGroup  >
                <SelectItem value="header" >Header</SelectItem>
                <SelectItem value="paragraph">Paragraph</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="radio-group">Radio-group</SelectItem>
              </SelectGroup>
        </SelectContent>
    </Select>
  )
}
