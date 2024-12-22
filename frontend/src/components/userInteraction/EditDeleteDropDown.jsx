import { BsThreeDots } from "react-icons/bs"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useCommentStore } from "@/store/commentStore"
export function EditDeleteDropDown() {
    const {}= useCommentStore();
  return (
    <Popover>
    <PopoverTrigger><BsThreeDots /></PopoverTrigger>
    <PopoverContent className="w-32 px-3 py-2">
        <p className="text-sm text-gray-500 hover:bg-slate-100 cursor-pointer px-2 py-2 rounded-lg">Edit</p>
        <p className="text-sm text-gray-500 hover:bg-slate-100 cursor-pointer px-2 py-2 rounded-lg" >Delete</p>
    </PopoverContent>
  </Popover>
  )
}
