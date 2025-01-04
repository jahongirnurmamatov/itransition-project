import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCommentStore } from "@/store/commentStore";
import { useState } from "react";
export function EditDeleteDropDown({ commentId, setEdit, d }) {
  const { deleteComment } = useCommentStore();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteComment(commentId);
    setOpen(false);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDots className="hover:opacity-80 hover:scale-110" />
      </PopoverTrigger>
      <PopoverContent className="w-32 px-3 py-2">
        <p
          onClick={() => setEdit(true)}
          className="text-sm text-gray-500 hover:bg-slate-100 cursor-pointer px-2 py-2 rounded-lg"
        >
          {d.edit}
        </p>
        <p
          onClick={handleDelete}
          className="text-sm text-gray-500 hover:bg-slate-100 cursor-pointer px-2 py-2 rounded-lg"
        >
          {d.delete}
        </p>
      </PopoverContent>
    </Popover>
  );
}
