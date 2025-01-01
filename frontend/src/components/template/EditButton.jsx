import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const EditButton = ({templateId}) => {
    const navigate = useNavigate();
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline"
            onClick={() => {
                navigate(`/template/edit/${templateId}`);
            }}
        >
            <FaEdit className="text-xl cursor-pointer text-primary" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit Template</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default EditButton