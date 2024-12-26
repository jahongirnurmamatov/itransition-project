import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import React from 'react'
import { Label } from "../ui/label"
import { useTemplateStore } from "@/store/templateStore";
  
  const SelectVisibilty = () => {
    const {visibility, setVisibility} = useTemplateStore();
    return (
        <div className="grid grid-cols-4 w-full items-center gap-4">
        <Label>Select Visibility</Label>
        <Select value={visibility} id="visibility"
          onValueChange={(value) => setVisibility(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="PUBLIC" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="PUBLIC">Public</SelectItem>
              <SelectItem value="PRIVATE">Private</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  }
  
  export default SelectVisibilty