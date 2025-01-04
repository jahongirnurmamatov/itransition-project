import { Checkbox } from "../ui/checkbox";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguageStore } from "@/store/languageStore";
const TemplateTableHeader = ({
  handleSortChange,
  titleOrder,
  createdAtOrder,
  topicOrder,
  allSelected,
  handleSelectAll,
}) => {
  const { dictionary } = useLanguageStore();
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
        </TableHead>
        <TableHead>
          <div
            onClick={() => handleSortChange("title", titleOrder)}
            className="flex gap-3 items-center justify-start cursor-pointer ml-3"
          >
            {dictionary.title}
            <ArrowDownNarrowWide
              className={`size-4 text-gray-500 ${titleOrder === "desc" ? "rotate-180" : ""}`}
            />
          </div>
        </TableHead>
        <TableHead>{dictionary.createdBy}</TableHead>
        <TableHead>
          <div
            onClick={() => handleSortChange("createdAt", createdAtOrder)}
            className="flex gap-3 items-center justify-start cursor-pointer"
          >
            {dictionary.date}
            <ArrowDownNarrowWide
              className={`size-4 text-gray-500 ${createdAtOrder === "desc" ? "rotate-180" : ""}`}
            />
          </div>
        </TableHead>
        <TableHead>
          <div
            onClick={() => handleSortChange("topic", topicOrder)}
            className="flex gap-3 items-center justify-start cursor-pointer"
          >
            {dictionary.topic}
            <ArrowDownNarrowWide
              className={`size-4 text-gray-500 ${topicOrder === "desc" ? "rotate-180" : ""}`}
            />
          </div>
        </TableHead>
        <TableHead>{dictionary.visibility}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TemplateTableHeader;
