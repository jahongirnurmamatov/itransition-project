import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { Separator } from "../ui/separator";
import { useUsersStore } from "@/store/usersStore";
import { toast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/languageStore";
const UserCard = ({ user,userId }) => {
  const {dictionary: d} = useLanguageStore();
  const { authUser } = useAuthStore();
  const { userRoleChange } = useUsersStore();
  const handleRoleChange = async ( role) => {
    const result = await userRoleChange(userId, role);
    if (result.success) {
      toast({
        title: d.success,
        description: d.userRoleChanged,
      });
    } 
  };

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
              <p className="font-bold">{user?.counts?.templates}</p>
              <p className="text-sm text-gray-500">{d.templates}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center justify-center gap-0">
              <p className="font-bold">{user?.counts?.responses}</p>
              <p className="text-sm text-gray-500">{d.responses}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center justify-center gap-0">
              <p className="font-bold">{user?.counts?.comments}</p>
              <p className="text-sm text-gray-500">{d.comments}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mx-5">
            <div className="flex items-center gap-2">
              <LuUserRound className="text-" />
              <span>{user?.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineEmail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineStatusOnline />
              <span>{user?.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineAdminPanelSettings className="text-xl" />
              {authUser?.role === "ADMIN" ? (
                <Select
                  defaultValue={user?.role}
                  onValueChange={(value) => handleRoleChange( value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={user?.role === "ADMIN" ? d.admin : d.user} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">{d.admin}</SelectItem>
                      <SelectItem value="USER">{d.user}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-md">{user?.role}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
