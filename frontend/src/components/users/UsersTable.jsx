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
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";
import { useToast } from "@/hooks/use-toast";
import PaginationComponent from "./PaginationComponent";
import { Checkbox } from "../ui/checkbox";
import UserActionButtons from "./UserActionButtons";
import SearchBox from "../sidebar/SearchBox";

const UsersTable = ({ d }) => {
  const { users, getAllUsers, error, totalPages, userRoleChange } =
    useUsersStore();
  const { toast } = useToast();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  
  const usernameOrder = searchParams.get("usernameOrder") || null;
  const emailOrder = searchParams.get("emailOrder") || null;
  const createdAtOrder = searchParams.get("createdAtOrder") || null;
  const page = searchParams.get("page") || 1;

  const [searchInput, setSearchInput] = useState(searchKey);

  const { authUser } = useAuthStore();

  if (authUser?.role !== "ADMIN") {
    return (
      <div className="flex justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-500">
          {d.notAuthorized}
        </h1>
      </div>
    );
  }

  useEffect(() => {
    getAllUsers(searchKey, page, usernameOrder, emailOrder, createdAtOrder);
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    }
  }, [getAllUsers, searchKey, page, usernameOrder, emailOrder, createdAtOrder]);

  const handleRoleChange = async (userId, role) => {
    const result = await userRoleChange(userId, role);
    if (result.success) {
      getAllUsers();
      toast({
        title: d.success,
        description: d.userRoleChanged,
      });
    } else {
      toast({
        variant: "destructive",
        title: d.error,
        description: d.userRoleChangeError,
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
  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("searchKey", searchInput);
    setSearchParams(newParams);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setAllSelected(!allSelected);
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="w-full bg-primary-foreground rounded-lg px-5 py-3 shadow-md">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center justify-between"
      >
       <SearchBox
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearchSubmit={handleSearchSubmit}
          handleKeyDown={handleKeyDown}
          d={d}
        />
        <UserActionButtons selectedUsers={selectedUsers} d={d} />
      </form>
      <Table>
        <TableCaption>{d.listUser}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSortChange("username", usernameOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer"
              >
                {d.username}
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
                {d.email}
                <ArrowDownNarrowWide
                  className={`size-4 text-gray-500 ${emailOrder === "desc" ? "rotate-180" : ""}`}
                />
              </div>
            </TableHead>
            <TableHead>{d.status}</TableHead>
            <TableHead>
              <div
                onClick={() => handleSortChange("createdAt", createdAtOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer"
              >
                {d.registered}
                <ArrowDownNarrowWide
                  className={`size-4 text-gray-500 ${createdAtOrder === "desc" ? "rotate-180" : ""}`}
                />
              </div>
            </TableHead>
            <TableHead>{d.role}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium cursor-pointer">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleSelectUser(user.id)}
                />
              </TableCell>
              <TableCell className="font-medium cursor-pointer">
                <Link
                  to={`/users/${user.id}`}
                  className="hover:text-blue-500 hover:underline flex gap-2 items-center justify-start"
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-slate-700">
                    {user.username}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-slate-700">
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={` rounded-full px-3 py-1 ${
                    user?.status === "ACTIVE"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600"
                  }`}
                >
                  {user?.status === "ACTIVE" ? d.active : d.blocked}
                </span>
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
                    className={`w-[120px] bg-primary-foreground ${
                      user.role === "ADMIN" ? "text-red-500" : "text-blue-500"
                    }`}
                  >
                    {user.role === "ADMIN" ? d.admin : d.user}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">{d.admin}</SelectItem>
                      <SelectItem value="USER">{d.user}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        totalPages={totalPages}
        page={page}
        webkey={"users"}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default UsersTable;
