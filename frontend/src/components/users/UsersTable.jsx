import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { format } from 'date-fns';
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import { Link } from "react-router-dom";
  import { Input } from "../ui/input";
  import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const UsersTable = () => {
    const [sortTitle, setSortTitle] = useState("asc");
    const [sortDate, setSortDate] = useState("asc");
    const {userRoleChange} = useAuthStore();
    const {users,getAllUsers,error} = useUsersStore();
    const { toast } = useToast();

    useEffect(() => {
        getAllUsers();  
        if(error)  {
            toast({
                title: "Error",
                description: error,
                status: "error",
            });
        }
      }, []);

    const handleRoleChange = async (userId, role) => {
        const result = await userRoleChange(userId, role);
        if (result.success) {
            getAllUsers();
            toast({
                title: "Success",
                description: "User role changed successfully",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "You are not authorized!",
            });
        }
    };
    return (
      <div className="w-full bg-white rounded-lg px-5 py-3 shadow-md">
        <div className="relative">
          <Input placeholder="Search" className='w-1/2 pl-5 mx-2 my-4 px-10 outline-none' />
          <Search className="absolute top-2 left-4 size-5 text-gray-400" />
        </div>
        <Table>
          <TableCaption>A list of users .</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >#</TableHead>
              <TableHead 
               onClick={() => setSortTitle(sortTitle === "asc" ? "desc" : "asc")}
                 >
                <div  className="flex gap-3 items-center justify-start cursor-pointer">
                  Username 
                  <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortTitle === "desc" ? "rotate-180" : ""}`} /> 
                </div>
              </TableHead>
              <TableHead
              onClick={() => setSortDate(sortDate === "asc" ? "desc" : "asc")}
             >
              <div  className="flex gap-3 items-center justify-start cursor-pointer">
                Email 
                <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortDate === "desc" ? "rotate-180" : ""}`}  />
              </div>
              </TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user,index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium cursor-pointer">
                  <Link
                    to={`/users/${user.id}`}
                    className="hover:text-blue-500 hover:underline"
                  >
                    {index+1}
                  </Link>
                </TableCell>
                <TableCell className="font-medium cursor-pointer" >
                  <Link
                    to={`/users/${user.id}`}
                    className="hover:text-blue-500 hover:underline flex gap-2 items-center justify-start"
                  >
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-700">{user.username}</span>
                  </Link>
                </TableCell>
                <TableCell><span className="font-semibold text-slate-700">{user.email}</span></TableCell>
                <TableCell><span className="text-gray-500">{formatDistanceToNow(user.createdAt)} ago</span></TableCell>
                <TableCell>
                    <Select  defaultValue={user.role}
                     onValueChange={(value) => handleRoleChange( user.id, value)}>
                        <SelectTrigger className={`w-24 bg-slate-100 ${user.role === "ADMIN" ? "text-red-500" : "text-blue-500"}`}>{ user.role}</SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Admin">ADMIN</SelectItem>
                                <SelectItem value="User">USER</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className={"mt-4"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
              <PaginationLink href="#">2</PaginationLink>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };
  

export default UsersTable