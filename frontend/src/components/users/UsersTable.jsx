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
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";

  const dummyUsers = [
    {
        id: 1,
        username: "John Doe",
        email: "johndoe@gmail.com",
        date: "2023-08-01",
        role: "Admin",
        avatar: 'https://avatar.iran.liara.run/public/boy?username=1'
    },
    {
        id: 2,
        username: "Jane Smith",
        email: "johndoe@gmail.com",
        date: "2023-08-02",
        role: "User",   
        avatar: 'https://avatar.iran.liara.run/public/boy?username=2' 
    },
    {
        id: 3,
        username: "Bob Johnson",
        email: "johndoe@gmail.com",
        date: "2023-08-03",
        role: "Admin",    
        avatar: 'https://avatar.iran.liara.run/public/boy?username=3'
    },
    {
        id: 4,
        username: "Alice Brown",
        email: "johndoe@gmail.com",
        date: "2023-08-04",
        role: "User",    
        avatar: 'https://avatar.iran.liara.run/public/boy?username=4'
    },
    {
        id: 5,
        username: "Eve White",
        email: "johndoe@gmail.com",
        date: "2023-08-05",
        role: "User",    
        avatar: 'https://avatar.iran.liara.run/public/boy?username=5'
    }
]

const UsersTable = () => {
    const [sortTitle, setSortTitle] = useState("asc");
    const [sortDate, setSortDate] = useState("asc");
    const [users,setUsers] = useState(dummyUsers);
  
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
              <TableHead>Date</TableHead>
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
                    className="hover:text-blue-500 hover:underline flex gap-2"
                  >
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(user.date, 'dd/MM/yyyy ')}</TableCell>
                <TableCell>
                    <Select  defaultValue={user.role}   
                    onValueChange={(value) =>  {const updatedUser = { ...user }; 
                    updatedUser.role = value; 
                    setUsers((prevUsers) =>
                      prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
                    )} }>
                        <SelectTrigger className="w-24">{ user.role}</SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="User">User</SelectItem>
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