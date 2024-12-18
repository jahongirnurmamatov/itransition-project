import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import PreviewComponent from "./Preview"
import { IoMdEye } from "react-icons/io";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
const PreviewComponentModal = () => {
  return (
    <Dialog >
          <DialogTrigger asChild>   
            <Button variant="outline">
                <IoMdEye className="size-7 hover:opacity-80 cursor-pointer"/>          
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80%] h-[90%]">
          <ScrollArea className="w-[95%]">
            <DialogHeader className={"text-center my-2 mb-5"}>
              <DialogTitle className='text-slate-900 text-2xl text-center'>Here is the preview of template</DialogTitle>
              <DialogDescription className='text-gray-500 text-sm my-2 italic'>
                You can edit further if you want
              </DialogDescription>
            </DialogHeader>
            <PreviewComponent />
        </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}

export default PreviewComponentModal