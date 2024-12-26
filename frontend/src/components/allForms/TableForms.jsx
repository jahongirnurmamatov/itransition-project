import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  formatDistanceToNow } from 'date-fns';

import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { Label } from "../ui/label";
import PaginationComponent from "../users/PaginationComponent";

const TabelForms = ({ data }) => {
  const [sortTitle, setSortTitle] = useState("asc");
  const [sortDate, setSortDate] = useState("asc");

  const {templates,getMyTemplates} = useTemplateStore();

  useEffect(()=>{
    getMyTemplates();
  },[])

  return (
    <div className="w-full bg-primary-foreground rounded-lg px-5 py-3 shadow-md">
      <div className="relative">
        <Input placeholder="Search" className='w-1/2 pl-5 mx-2 my-4 px-10 outline-none text-gray-500' />
        <Search className="absolute top-2 left-4 size-5 text-gray-400" />
      </div>
      <Table>
        <TableCaption>A list of your all templates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >#</TableHead>
            <TableHead 
             onClick={() => setSortTitle(sortTitle === "asc" ? "desc" : "asc")}
           	>
              <div  className="flex gap-3 items-center justify-start cursor-pointer">
                Title 
                <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortTitle === "desc" ? "rotate-180" : ""}`} /> 
              </div>
            </TableHead>
            <TableHead
            onClick={() => setSortDate(sortDate === "asc" ? "desc" : "asc")}
           >
            <div  className="flex gap-3 items-center justify-start cursor-pointer">
              Date 
              <ArrowDownNarrowWide className={`size-4 text-gray-500 ${sortDate === "desc" ? "rotate-180" : ""}`}  />
            </div>
            </TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Visibility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template,index) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium cursor-pointer">
                <Link
                  to={`/templates/${template.id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                 <Label>{index+1}</Label> 
                </Link>
              </TableCell>
              <TableCell className="font-medium cursor-pointer" >
                <Link
                  to={`/templates/${template.id}`}
                  className="hover:text-blue-500 hover:underline flex items-center gap-5"
                > 
                <div className="w-20 h-10">
                  <img 
                  className="object-cover  w-full h-full rounded-lg"
                  src={template.imageUrl||"https://www.shutterstock.com/image-photo/clipboard-blank-sheet-on-isolated-600nw-1896725329.jpg"} alt="" />
                </div>
                  <p className="overflow-hidden max-w-[150px] max-h-[50px]">{template.title}</p>
                </Link>
              </TableCell>
              <TableCell>{formatDistanceToNow(template.createdAt)} ago</TableCell>
              <TableCell>{template.topic}</TableCell>
              <TableCell>{template.description||"-"}</TableCell>
              <TableCell>
                <div className={`px-2 py-1 text-center rounded-full ${template.visibility === "PUBLIC" ? "bg-green-400" : "bg-red-400"} bg-red-400 text-white`}>{template.visibility}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent />
    </div>
  );
};

export default TabelForms;
