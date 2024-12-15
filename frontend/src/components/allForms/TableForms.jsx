import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const TabelForms = ({ data }) => {
  const [sortTitle, setSortTitle] = useState("asc");
  const [sortDate, setSortDate] = useState("asc");

  return (
    <div className="w-full bg-white rounded-lg px-5 py-3 shadow-md">
      <div className="relative">
        <Input placeholder="Search" className='w-1/2 pl-5 mx-2 my-4 px-10 outline-none' />
        <Search className="absolute top-2 left-4 size-5 text-gray-400" />
      </div>
      <Table>
        <TableCaption>A list of your all templates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead 
             onClick={() => setSortTitle(sortTitle === "asc" ? "desc" : "asc")}
            className="flex gap-3 items-center justify-start cursor-pointer"	>Title <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortTitle === "desc" ? "rotate-180" : ""}`} /> </TableHead>
            <TableHead>Status</TableHead>
            <TableHead
            onClick={() => setSortDate(sortDate === "asc" ? "desc" : "asc")}
            className="flex gap-3 items-center justify-start cursor-pointer">Date <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortDate === "desc" ? "rotate-180" : ""}`}  /></TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium cursor-pointer">
                <Link
                  to={`/my-templates/${item.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {item.id}
                </Link>
              </TableCell>
              <TableCell className="font-medium cursor-pointer" >
                <Link
                  to={`/my-templates/${item.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.description}</TableCell>
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

export default TabelForms;
