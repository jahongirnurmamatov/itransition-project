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

const TabelForms = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg px-5 py-3 shadow-md">
      <Table>
        <TableCaption>A list of your all templates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
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
