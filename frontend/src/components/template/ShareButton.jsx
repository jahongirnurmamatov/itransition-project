import { Copy } from "lucide-react"
import { RiShareForwardFill } from "react-icons/ri";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguageStore } from "@/store/languageStore";

export function ShareButton({url}) {
  const {dictionary:d}= useLanguageStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='text-primary'>{d.share} 
            <RiShareForwardFill className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {d.link}
            </Label>
            <Input
              id="link"
              value={url}
              readOnly
            />
          </div>
          <Button 
          onClick={() =>  navigator.clipboard.writeText(url)}
          type="submit" size="sm" className="px-3">
            <span className="sr-only">{d.copy}</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {d.close}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
