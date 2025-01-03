import {
  Checkbox,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTemplateStore } from "@/store/templateStore";
import { BsChatLeftQuote } from "react-icons/bs";
import Tags from "./Tags";
import { Button } from "../ui/button";
import {  useState } from "react";
import { useResponseStore } from "@/store/responseStore";
import { ImSpinner } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const PreviewComponent = ({ templateId, isSubmitted, response }) => {
  const { title, topic, imageUrl, forms, tags, description, previewImg } =
    useTemplateStore();
  const { addResponse, isAddingResponse } = useResponseStore();
  const { navigate } = useNavigate();

  const [selectValues, setSelectValues] = useState({});

  const handleSelectChange = (formId, value) => {
    setSelectValues((prev) => ({
      ...prev,
      [formId]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = forms.map((form) => {
      const value = (() => {
        switch (form.type) {
          case "number":
            return document.getElementById(`question-${form.id}`).value;
          case "checkbox":
            return form.options
              .filter(
                (_, i) =>
                  document.getElementById(`checkbox-${form.id}-${i}`).checked
              )
              .join(",");
          case "radio":
            return document.querySelector(
              `input[name="radio-${form.id}"]:checked`
            )?.value;
          case "textarea":
            return document.getElementById(`question-${form.id}`).value;
          case "select":
            return selectValues[form.id] || null;
          default:
            return null;
        }
      })();

      return {
        questionId: form.id,
        value,
      };
    });
    addResponse(templateId, answers);
    setIsSubmitted(true);
    navigate(`/`, { replace: true });
  };
  return (
    <div className="w-full   flex flex-col items-start">
      {previewImg ||
        (imageUrl && (
          <div className="flex items-center justify-center h-[300px] w-[100%] top-0">
            <img
              src={previewImg || imageUrl}
              alt=""
              className="h-[200px] w-[100%] overflow-hidden object-cover"
            />
          </div>
        ))}
      <div className="mx-auto w-4/5 my-6">
        <h1 className="text-2xl text-center font-bold text-primary">{title}</h1>

        <div className="flex justify-end my-2">
          {topic && (
            <div className="flex gap-2">
              <BsChatLeftQuote className="size-5 text-gray-500 " />
              <p className="text-sm text-gray-600">{topic}</p>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm font-light text-gray-500">{description}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-5">
          {forms.map((form) => (
            <div
              key={form.id}
              className="w-full bg-primary-foreground rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
            >
              {form.type !== "header" && form.type !== "paragraph" && (
                <>
                  {form.label && (
                    <p className="text-lg font-semibold font-sans">
                      {form.label}
                    </p>
                  )}
                  {form.description && (
                    <p className="text-sm font-light text-gray-500">
                      {form.description}
                    </p>
                  )}
                </>
              )}

              {(() => {
                switch (form.type) {
                  case "header":
                    return (
                      <h1 className="font-bold text-center text-2xl">
                        {form.label}
                      </h1>
                    );
                  case "number":
                    return (
                      <Input
                        id={`question-${form.id}`}
                        type="number"
                        value={(response && response[form.id]) || ""}
                        placeholder="Type a number here"
                        className="w-2/3 p-2"
                        disabled={false}
                      />
                    );
                  case "checkbox":
                    return form.options.map((option, index) => (
                      <div key={index}>
                        <Checkbox
                          id={`checkbox-${form.id}-${index}`}
                          checked={
                            response && response[form.id]?.includes(option)
                          }
                          disabled={false}
                        />
                        <label htmlFor={`checkbox-${form.id}-${index}`}>
                          {option}
                        </label>
                      </div>
                    ));
                  case "radio":
                    return (
                      <RadioGroup
                        name={`radio-${form.id}`}
                        value={(response && response[form.id]) || ""}
                      >
                        {form.options.map((option, index) => (
                          <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio disabled={false} />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    );
                  case "textarea":
                    return (
                      <TextField
                        id={`question-${form.id}`}
                        multiline
                        rows={4}
                        variant="standard"
                        value={(response && response[form.id]) || ""}
                        disabled={false}
                      />
                    );
                  case "select":
                    return (
                      <Select
                        value={(response && response[form.id]) || ""}
                        id={`question-${form.id}`}
                        onValueChange={(value) =>
                          handleSelectChange(form.id, value)
                        }
                        disabled={false} // Add a disabled prop here
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {form.options.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  case "paragraph":
                    return (
                      <p className="text-sm font-light text-gray-500">
                        {form.label}
                      </p>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          ))}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              variant="contained"
              className={`w-1/3 text-white bg-primary  ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSubmitted || isAddingResponse}
            >
              {isAddingResponse ? (
                <ImSpinner className="animate-spin mx-auto" />
              ) : isSubmitted ? (
                "Already Submitted"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
        {tags.length > 0 && <Tags tags={tags} />}
      </div>
    </div>
  );
};

export default PreviewComponent;
