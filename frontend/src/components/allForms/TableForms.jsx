import {
  Table,
  TableCaption,
  TableCell,
} from "@/components/ui/table";
import { AiFillDelete } from "react-icons/ai";

import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { Label } from "../ui/label";
import PaginationComponent from "../users/PaginationComponent";
import { toast } from "@/hooks/use-toast";
import TemplateTableBody from "./TemplateTableBody";
import { Button } from "../ui/button";
import TemplateTableHeader from "./TemplateTableHeader";
import { Search } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const TabelForms = ({ userId }) => {
  const {templates,getMyTemplates,error,totalPages,deleteManyTemplates} = useTemplateStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const titleOrder = searchParams.get("titleOrder") || null;
  const topicOrder = searchParams.get("topicOrder") || null;
  const createdAtOrder = searchParams.get("createdAtOrder") || null;
  const [searchInput, setSearchInput] = useState(searchKey);
  const page = searchParams.get("page") || 1;
  
  const {authUser} = useAuthStore();

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    getMyTemplates(searchKey,page, titleOrder,createdAtOrder, topicOrder,userId );
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    }
  }, [getMyTemplates, searchKey,  titleOrder,page, topicOrder, createdAtOrder,userId]);

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

const handleSelectAll = () => {
  if (allSelected) {
    setSelectedTemplates([]);
  } else {
    setSelectedTemplates(templates.map((template) => template.id));
  }
  setAllSelected(!allSelected);
};

const handleSelectTemplate = (templateId) => {
  if (selectedTemplates.includes(templateId)) {
    setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId));
  } else {
    setSelectedTemplates([...selectedTemplates, templateId]);
  }
};

const handleDeleteMany = ()=>{
  if(selectedTemplates.length > 0){
    deleteManyTemplates(selectedTemplates);
    setSelectedTemplates([]);
  }else{
    toast({
      title: "Error",
      variant: "destructive",
      description: "Please select at least one template.",
    })
  }
}
  return (
    <div className="w-full bg-primary-foreground rounded-lg px-5 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Input placeholder="Search" 
           onChange={(e) => setSearchInput(e.target.value)}
           onKeyDown={handleKeyDown}
            className='w-1/2 pl-5  mx-2 my-4 px-10 outline-none text-gray-500' />
          <Search className="absolute top-6 left-4 size-5 text-gray-400" />
        </div>
        {
          authUser?.role === "ADMIN" || userId == templates[0]?.user?.id ? 
          <Button variant='outline' 
            onClick={handleDeleteMany} className='mx-2 my-4 bg-primary-foreground'>
          <AiFillDelete className="text-red-500"/> 
        </Button> : null
        }
      </div>
      <Table>
        <TableCaption>A list of your all templates.</TableCaption>
            <TemplateTableHeader 
                handleSortChange={handleSortChange}
                titleOrder={titleOrder}
                createdAtOrder={createdAtOrder}
                topicOrder={topicOrder}
                allSelected={allSelected}
                handleSelectAll={handleSelectAll}
                />
            {searchKey && templates.length === 0 ? 
            <TableCell colSpan="6" className="text-center">
              <Label className='text-md text-gray-500 italic'>No templates found.</Label>
            </TableCell> 
            : <TemplateTableBody handleSelectTemplate={handleSelectTemplate}
                                  selectedTemplates={selectedTemplates}
            />
          }
          </Table>
          <PaginationComponent page={page} totalPages={totalPages} 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          webkey={'my-templates'}/>
        </div>
      );
};

export default TabelForms;
