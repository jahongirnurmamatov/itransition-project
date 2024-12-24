import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";
import { useToast } from "@/hooks/use-toast";

const UsersTable = () => {
  const { userRoleChange } = useAuthStore();
  const { users, getAllUsers, error } = useUsersStore();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchParams.get("searchKey") || "";
  const usernameOrder = searchParams.get("usernameOrder") || null;
  const emailOrder = searchParams.get("emailOrder") || null;
  const createdAtOrder = searchParams.get("createdAtOrder") || null;
  const page = searchParams.get("page") || 1;

  const [searchInput, setSearchInput] = useState(searchKey);

  useEffect(() => {
    getAllUsers(searchKey, page, usernameOrder, emailOrder, createdAtOrder);
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    }
  }, [getAllUsers,searchKey, page, usernameOrder, emailOrder, createdAtOrder]);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSortChange = (field, currentOrder) => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const newParams = new URLSearchParams(searchParams.toString());
    if (field === "username") {
        newParams.set("usernameOrder", newOrder);
        newParams.delete("emailOrder");
        newParams.delete("createdAtOrder");
    } else if (field === "email") {
        newParams.delete("usernameOrder");
        newParams.set("emailOrder", newOrder);
        newParams.delete("createdAtOrder");
    } else if (field === "createdAt") {
        newParams.delete("usernameOrder");
        newParams.delete("emailOrder");
        newParams.set("createdAtOrder", newOrder);
    }
    newParams.set("page", "1"); 
    setSearchParams(newParams);
};
;

  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("searchKey", searchInput);
    setSearchParams(newParams);
  };

  return (
    <div className="w-full bg-white rounded-lg px-5 py-3 shadow-md">
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-1/2 pl-5 mx-2 my-4 px-10 outline-none"
        />
        <Search
          onClick={handleSearchSubmit}
          className="absolute top-2 left-4 size-5 text-gray-400 cursor-pointer hover:scale-110"
        />
      </form>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>
              <div
                onClick={() => handleSortChange("username", usernameOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer"
              >
                Username
                <ArrowDownNarrowWide
                  className={`size-4 text-gray-500 ${usernameOrder === "desc" ? "rotate-180" : ""}`}
                />
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSortChange("email", emailOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer"
              >
                Email
                <ArrowDownNarrowWide
                  className={`size-4 text-gray-500 ${emailOrder === "desc" ? "rotate-180" : ""}`}
                />
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSortChange("createdAt", createdAtOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer"
                >
                Registered
                <ArrowDownNarrowWide
                  className={`size-4 text-gray-500 ${createdAtOrder === "desc" ? "rotate-180" : ""}`}
                />
                </div>
            </TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium cursor-pointer">
                <Link to={`/users/${user.id}`} className="hover:text-blue-500 hover:underline">
                  {index + 1}
                </Link>
              </TableCell>
              <TableCell className="font-medium cursor-pointer">
                <Link
                  to={`/users/${user.id}`}
                  className="hover:text-blue-500 hover:underline flex gap-2 items-center justify-start"
                >
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-slate-700">{user.username}</span>
                </Link>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-slate-700">{user.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-500">
                  {formatDistanceToNow(new Date(user.createdAt))} ago
                </span>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger
                    className={`w-24 bg-slate-100 ${
                      user.role === "ADMIN" ? "text-red-500" : "text-blue-500"
                    }`}
                  >
                    {user.role}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
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

export default UsersTable;
