import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
  return (
    <div className="bg-transparent text-gray-300 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 flex flex-col  items-start justify-start "> 
          <h3 className="text-lg font-semibold mb-2">MyForms Co. Ltd.</h3>
          <p className="text-sm">
            1000012 Galaba 216,60
            <br />
            Navoi, Uzbekistan, 1000012
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" >
                Name
              </Label>
              <Input id="name" placeholder="Your Name" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">
                Email
              </Label>
              <Input id="email" placeholder="Your Email" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message" >
                Message
              </Label>
              <Textarea id="message" placeholder="Your Message" className="w-full min-h-[100px]" />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}