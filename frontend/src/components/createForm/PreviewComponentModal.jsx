import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import PreviewComponent from "./Preview"
import { IoMdEye } from "react-icons/io";
import { ScrollArea } from "../ui/scroll-area";
const PreviewComponentModal = ({forms}) => {
  return (
    <Dialog >
          <DialogTrigger asChild>   
            <button className="flex gap-1">
                <p>Preview</p>  
                <IoMdEye className="size-7 hover:opacity-80 cursor-pointer"/> 
            </button>      
                
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80%] h-[90%]">
          <ScrollArea className="w-[95%]">
            <DialogHeader>
              <DialogTitle>Here is the preview of template</DialogTitle>
              <DialogDescription>
                You can edit further if you want
              </DialogDescription>
            </DialogHeader>
            <PreviewComponent forms={forms} />
        </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}

export default PreviewComponentModal