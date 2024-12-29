import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { Label } from "../ui/label";
import PaginationComponent from "../users/PaginationComponent";
import { useToast } from "@/hooks/use-toast";
import TemplateTableBody from "./TemplateTableBody";
import { Checkbox } from "../ui/checkbox";

const TabelForms = ({ data }) => {
  const {templates,getMyTemplates,error,totalPages} = useTemplateStore();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const titleOrder = searchParams.get("titleOrder") || null;
  const topicOrder = searchParams.get("topicOrder") || null;
  const createdAtOrder = searchParams.get("createdAtOrder") || null;
  const [searchInput, setSearchInput] = useState(searchKey);
  const page = searchParams.get("page") || 1;

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

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
              <TableHead>
                <Checkbox  checked={allSelected}
                          onCheckedChange={handleSelectAll } />
              </TableHead>
              <TableHead>
                <div 
                onClick={() => handleSortChange("title", titleOrder)}
                className="flex gap-3 items-center justify-start cursor-pointer ml-3">
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
