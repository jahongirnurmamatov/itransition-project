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
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function DialogDemo({setFormType, addForm,formType}) {

    const handleAddForm = () => {
        if (formType!='') {
          addForm(formType);
        } else {
          alert("Please select a question type.");
        }
      };
  return (
    <Dialog >
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
        <Select onValueChange={(value)=>setFormType(value)}>
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
          <Button type="button" onClick={handleAddForm} >Add Question Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
