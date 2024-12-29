import { Checkbox } from "../ui/checkbox";
import { ArrowDownNarrowWide } from "lucide-react";
import {
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
const TemplateTableHeader = ({
    handleSortChange,
    titleOrder,
    createdAtOrder,
    topicOrder,
    allSelected,
    handleSelectAll
}) => {
  return (
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
  )
}

export default TemplateTableHeader