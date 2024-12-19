import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

import {labeledTags} from '@/assets/data.js'
const topics = [
    "Education",
    "Health",
    "Sport",
    "Politics",
    "Economy",
    "Technology",
    "Entertainment",
    "Others",
]
import { MdOutlineEditCalendar } from "react-icons/md";
import { useTemplateStore } from "@/store/templateStore"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
export function TitleSheet() {
  const {title,setTitle, topic, setTopic, setImage,tags,setTags,descripton,setDescription} = useTemplateStore()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MdOutlineEditCalendar className="size-6 hover:opacity-80 cursor-pointer"/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Template Essentials</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title" defaultValue={`Title - ${Date.now()}`}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              Topic
            </Label>
            <Select onValueChange={(e) => setTopic(e)} value={topic} id='topic'>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                    <SelectContent>
                        <SelectGroup  >
                        {
                            topics.map((topic) => (
                              <SelectItem onChange={(e) => setTopic(e.target.value)} key={topic} value={topic} >
                                {topic}
                              </SelectItem>
                            ))
                          }
                        </SelectGroup>
                  </SelectContent>
              </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Description</Label>
            <Input onChange={(e) => setDescription(e.target.value)} value={descripton} id="description" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Add Tags</Label>
            <Stack spacing={2} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="size-small-standard-multi"
                size="small"
                options={labeledTags}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Add Tags"
                    placeholder="Select Tags"
                  />
                )}
              />
        </Stack>
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              Image
            </Label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Create Template</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
