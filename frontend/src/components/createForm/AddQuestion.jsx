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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A Dialog component that provides an example of how to use the Dialog component.
 *
 * This example shows how to use the Dialog component to add a question type to
 * a form. The Dialog has a title, a description, a select component to select
 * the question type, and a button to add the question type.
 *
 * @example
 * <DialogDemo />
 */

/******  d611b3d4-d0b1-4c17-a4ac-724ff2fc3ade  *******/
export function DialogDemo() {
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
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="header">Header</SelectItem>
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
