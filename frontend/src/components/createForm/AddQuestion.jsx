import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect } from "react"

export function DialogDemo({setQuestionType, questionType}) {
   
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-slate-900 text-white' variant="outline">Add Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Question Type</DialogTitle>
          <DialogDescription>
            Here you can select one type of question only
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value)=>setQuestionType(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Question type" />
            </SelectTrigger>
         <SelectContent>
            <SelectGroup >
                 <SelectItem value="header" >Header</SelectItem>
                  <SelectItem value="paragraph">Paragraph</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                 <SelectItem value="radio-group">Radio-group</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
        <DialogFooter>
          <Button type="submit">Add Question Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
