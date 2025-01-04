import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IconButton } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useTemplateStore } from "@/store/templateStore";
import { Input } from "../ui/input";

export default function SelectForm({ id, editing, d }) {
  const [newOption, setNewOption] = useState("");
  const { forms, setForms } = useTemplateStore();
  const [editingOption, setEditingOption] = useState(false);
  const handleAddOption = () => {
    if (newOption.trim()) {
      const updatedForms = forms.map((form) => {
        if (form.id === id) {
          return { ...form, options: [...form.options, newOption.trim()] };
        }
        return form;
      });
      setForms(updatedForms);
      setNewOption("");
    }
  };
  const handleRemoveOption = (optionToRemove) => {
    const updatedForms = forms.map((form) => {
      if (form.id === id) {
        return {
          ...form,
          options: form.options.filter((opt) => opt !== optionToRemove),
        };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const form = forms.find((form) => form.id === id);

  if (!form) return null;
  return (
    <>
      {!editing ? (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={d?.select} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {form.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="flex flex-col items-start gap-2">
          {form.options.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <p>{option}</p>
              <IconButton
                size="small"
                onClick={() => handleRemoveOption(option)}
              >
                <MdDelete className="text-red-500 size-5" />
              </IconButton>
            </div>
          ))}
          {editing && (
            <div className="flex gap-2 items-center mt-2">
              <input
                id="newOption"
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder={d?.addOption}
                className="p-2 border border-gray-300 rounded-md  bg-inherit  w-full sm:w-2/3"
              />
              <IconButton size="small" onClick={handleAddOption}>
                <IoAddCircleSharp className="text-primary size-7" />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </>
  );
}
