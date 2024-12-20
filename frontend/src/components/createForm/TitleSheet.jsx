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
  const {title,setTitle, topic,setImage, setTopic,tags,setTags,image,
    uploadToCloudinary,descripton,setDescription,isLoading} = useTemplateStore()
  
    const handleUpload = async() => {
      const form = new FormData();
      form.append('file', image);
      await uploadToCloudinary(form);
    }

  return (
    <Sheet className="w-full sm:w-1/2 lg:w-1/5">
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
            <Input className="col-span-3" onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title" defaultValue={`Title - ${Date.now()}`} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              Topic
            </Label>
            <Select  onValueChange={(e) => setTopic(e)} value={topic} id='topic'>
                <SelectTrigger  className="col-span-3">
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
            <Label htmlFor="topic" className="text-right">
              Image
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input onChange={(e) => setImage(e.target.files[0])} type="file" className='' />
              <Button disabled={isLoading} onClick={()=>handleUpload()} className="mt-2 bg-green-600 hover:bg-green-500">Upload Image</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 w-full items-center gap-4">
            <Label>Add Tags</Label>
            <Stack className="col-span-3" spacing={2} >
              <Autocomplete
                multiple
                id="tags-standard"
                options={labeledTags}
                getOptionLabel={(option) => option.title}
                value={tags.map((tagTitle) => labeledTags.find((tag) => tag.title === tagTitle) || { title: tagTitle })} // Map back to full objects
                onChange={(event, newValue) => {
                  setTags(newValue.map((option) => option.title)); 
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Tags"
                    placeholder="Tags"
                    className="w-1/2"
                  />
                )}
              />


            </Stack>
          </div>
         
        </div>
      </SheetContent>
    </Sheet>
  )
}
