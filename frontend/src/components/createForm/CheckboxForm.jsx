import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { useTemplateStore } from "@/store/templateStore";
const CheckboxForm = ({ id, editing, setEditing, d }) => {
  const [newOption, setNewOption] = useState("");
  const { forms, setForms } = useTemplateStore();

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
    <div className="flex flex-col gap-1">
      {form.options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <FormControlLabel
            control={<Checkbox />}
            label={option}
            onClick={() => setEditing(true)}
          />
          {editing && (
            <IconButton size="small" onClick={() => handleRemoveOption(option)}>
              <MdDelete className="text-red-500 size-5" />
            </IconButton>
          )}
        </div>
      ))}
      <div className="flex gap-2 items-center mt-2">
        {editing && (
          <>
            <input
              id="newOption"
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder={d?.addOption}
              className="p-2 border border-gray-300 rounded-md bg-inherit w-full sm:w-2/3"
            />
            <IconButton size="small" onClick={handleAddOption}>
              <IoAddCircleSharp className="text-primary size-7" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckboxForm;
