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

import { Link, useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { Label } from "../ui/label";
import PaginationComponent from "../users/PaginationComponent";
import { useToast } from "@/hooks/use-toast";

const TabelForms = ({ data }) => {
  const {templates,getMyTemplates,error} = useTemplateStore();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const titleOrder = searchParams.get("titleOrder") || null;
  const topicOrder = searchParams.get("topicOrder") || null;
  const createdAtOrder = searchParams.get("createdAtOrder") || null;
  const [searchInput, setSearchInput] = useState(searchKey);
  const page = searchParams.get("page") || 1;


  useEffect(() => {
    getMyTemplates(searchKey,page, titleOrder,createdAtOrder, topicOrder );
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    }
  }, [getMyTemplates, searchKey,  titleOrder,page, topicOrder, createdAtOrder]);

  
  const handleSortChange = (field, currentOrder) => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const newParams = new URLSearchParams(searchParams.toString());
    if (field === "title") {
        newParams.set("titleOrder", newOrder);
        newParams.delete("createdAtOrder");
        newParams.delete("topicOrder");
    } else if (field === "createdAt") {
        newParams.set("createdAtOrder", newOrder);
        newParams.delete("titleOrder");
        newParams.delete("topicOrder");
    } else if (field === "topic") {
        newParams.set("topicOrder", newOrder);
        newParams.delete("createdAtOrder");
        newParams.delete("titleOrder");
    } 
    newParams.set("page", "1"); 
    setSearchParams(newParams);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSearchSubmit();
  }
};

const handleSearchSubmit = () => {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set("searchKey", searchInput);
  setSearchParams(newParams);
};
  return (
    <div className="w-full bg-primary-foreground rounded-lg px-5 py-3 shadow-md">
      <div className="relative">
        <Input placeholder="Search" 
         onChange={(e) => setSearchInput(e.target.value)}
         onKeyDown={handleKeyDown}
        className='w-1/2 pl-5 mx-2 my-4 px-10 outline-none text-gray-500' />
        <Search className="absolute top-2 left-4 size-5 text-gray-400" />
      </div>
      <Table>
        <TableCaption>A list of your all templates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >#</TableHead>
            <TableHead 
           	>
              <div 
              onClick={() => handleSortChange("title", titleOrder)}
              className="flex gap-3 items-center justify-start cursor-pointer">
                Title 
                <ArrowDownNarrowWide className={`size-4 text-gray-500 ${titleOrder === "desc" ? "rotate-180" : ""}`} /> 
              </div>
            </TableHead>
            <TableHead
           >
            <div
            onClick={() => handleSortChange("createdAt", createdAtOrder)}
            className="flex gap-3 items-center justify-start cursor-pointer">
              Date 
              <ArrowDownNarrowWide
               className={`size-4 text-gray-500 ${createdAtOrder === "desc" ? "rotate-180" : ""}`} />
            </div>
            </TableHead>
            <TableHead>
              <div 
               onClick={() => handleSortChange("topic", topicOrder)}
               className="flex gap-3 items-center justify-start cursor-pointer">
                Topic
                <ArrowDownNarrowWide
                className={`size-4 text-gray-500 ${topicOrder === "desc" ? "rotate-180" : ""}`} />
              </div>
            </TableHead>
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
                <div className={`px-2 py-1 text-center rounded-full ${template.visibility === "PUBLIC" ? "bg-green-500" : "bg-red-500"} bg-red-400 text-white`}>{template.visibility}</div>
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
