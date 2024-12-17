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
import { Button } from "../ui/button";
const PreviewComponentModal = ({forms}) => {
  return (
    <Dialog >
          <DialogTrigger asChild>   
            <Button variant="outline">
                <IoMdEye className="size-7 hover:opacity-80 cursor-pointer"/>          
            </Button>
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