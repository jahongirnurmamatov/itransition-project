import { useTemplateStore } from "@/store/templateStore";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { formatDistanceToNow } from "date-fns";

const TemplateTableBody = ({ handleSelectTemplate, selectedTemplates }) => {
  const { templates } = useTemplateStore();
  return (
    <TableBody>
      {templates?.map((template, index) => (
        <TableRow key={template.id}>
          <TableCell className="font-medium cursor-pointer">
            <Checkbox
              checked={selectedTemplates.includes(template.id)}
              onCheckedChange={() => handleSelectTemplate(template.id)}
            />
          </TableCell>
          <TableCell className="font-medium cursor-pointer ">
            <Link
              to={`/templates/${template.id}`}
              className="hover:text-blue-500 hover:underline flex items-center gap-5 ml-3"
            >
              <div className="w-16 h-12">
                <img
                  className="object-cover  w-full h-full rounded-lg"
                  src={
                    template.imageUrl ||
                    "https://form-publisher.com/blog/content/images/size/w1200/2023/01/How-to-Make-your-own-Google-Form.png"
                  }
                  alt=""
                />
              </div>
              <p className="overflow-hidden max-w-[100px] max-h-[40px]">
                {template.title}
              </p>
            </Link>
          </TableCell>
          <TableCell>{template.user.username}</TableCell>
          <TableCell>{formatDistanceToNow(template.createdAt)} ago</TableCell>
          <TableCell>{template.topic || "None"}</TableCell>
          <TableCell>
            <div
              className={`px-2 py-1 text-center rounded-full ${template?.visibility === "PUBLIC" ? "bg-green-500" : "bg-red-500"} text-white`}
            >
              {template.visibility}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TemplateTableBody;
