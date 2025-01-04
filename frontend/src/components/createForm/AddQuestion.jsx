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
import { useToast } from "@/hooks/use-toast";

export function DialogDemo({setFormType, addForm,formType,d}) {
    const {toast} = useToast();
    const handleAddForm = () => {
        if (formType!='') {
          addForm(formType);
        } else {
          toast({ 
            variant: "destructive", 
            title: d.pleaseSelect  } );
        }
      };
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className='bg-slate-900 text-white' variant="outline">{d.addQuestion}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{d.selectQuestionType}</DialogTitle>
          <DialogDescription>
            {d.selectOneQuestion}
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value)=>setFormType(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={d.select} />
            </SelectTrigger>
         <SelectContent>
            <SelectGroup >
                 <SelectItem value="header" >{d.header}</SelectItem>
                  <SelectItem value="paragraph">{d.paragraph}</SelectItem>
                  <SelectItem value="number">{d.number}</SelectItem>
                  <SelectItem value="radio">{d.radio}</SelectItem>
                  <SelectItem value="textarea">{d.textarea}</SelectItem>
                  <SelectItem value="checkbox">{d.checkbox}</SelectItem>
                  <SelectItem value="image">{d.image}</SelectItem>
                  <SelectItem value="select">{d.select}</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
        <DialogFooter>
          <Button type="button" onClick={handleAddForm} >{d.addQuestionType}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
