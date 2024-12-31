import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { LuUserRound } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useAuthStore } from "@/store/authStore"
import { Separator } from "../ui/separator";
const UserCard = ({user}) => {
    
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-center">
            <img className="w-20 h-20 rounded-full" src={user?.avatar} alt="" />
        </div>
      </CardHeader>
      <CardContent>
       <div className="flex flex-col gap-10">
       <div className="flex h-5 items-center justify-center space-x-4 mt-10">
          <div className="flex flex-col items-center justify-center gap-0">
            <p className="font-bold">{user.counts.templates}</p>
            <p className="text-sm text-gray-500">Templates</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-0">
            <p className="font-bold">{user.counts.responses}</p>
            <p className="text-sm text-gray-500">Responses</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-0">
            <p className="font-bold">{user.counts.comments}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-5">
            <div className="flex items-center gap-2">
                <LuUserRound className="text-"/>
                <span>{user?.username}</span>
            </div>
            <div className="flex items-center gap-2">
                <MdOutlineEmail/>
                <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
                <HiOutlineStatusOnline/>
                <span>{user?.status}</span>
            </div>
            <div className="flex items-center gap-2">
                <MdOutlineAdminPanelSettings className="text-xl"/>
                {user?.role==='ADMIN' ? 
                <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={user?.role} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                : 
                <span className="text-md">{user?.role}</span>}
            </div>
        </div>
       </div>
      </CardContent>
    </Card>
  )
}

export default UserCard