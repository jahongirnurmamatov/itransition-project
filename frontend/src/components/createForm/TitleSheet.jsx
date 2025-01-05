import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const topics = [
  "Survey",
  "Application Form",
  "Poll",
  "Quiz",
  "Registration",
  "Contact Form",
];
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTemplateStore } from "@/store/templateStore";
import SelectVisibilty from "./SelectVisibilty";
import ShareWith from "./ShareWith";
import CustomAsyncSelect from "./CustomAsyncSelect";
import { useState } from "react";

export function TitleSheet({ d }) {
  const {
    title,
    setTitle,
    topic,
    setImage,
    setTopic,
    tags,
    setTags,
    image,
    uploadToCloudinary,
    description,
    setDescription,
    isLoading,
    visibility,
  } = useTemplateStore();
  const [uploaded,setUploaded] = useState(false)

  const handleUpload = async () => {
    const form = new FormData();
    form.append("file", image);
    await uploadToCloudinary(form);
    setUploaded(true)
  };

  return (
    <>
      {d && (
        <div className="w-full items-start mt-10 justify-start ">
          <div className="flex items-center flex-col gap-5 space-x-5 mb-8">
            <h1 className="text-2xl text-gray-700 font-semibold">{d?.editTempEssent}</h1>
            <p className="text-gray-500 font-serif ">{d.makeChanges}</p>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {d.title}
              </Label>
              <Input
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                id="title"
                defaultValue={`Title - ${Date.now()}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="topic" className="text-right">
                {d.topic}
              </Label>
              <Select
                onValueChange={(e) => setTopic(e)}
                value={topic}
                id="topic"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={d?.select} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {topics.map((topic) => (
                      <SelectItem
                        onChange={(e) => setTopic(e.target.value)}
                        key={topic}
                        value={topic}
                      >
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">{d?.description}</Label>
              <ReactQuill className="col-span-3 h-[200px]"  theme="snow" value={description} onChange={setDescription} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mt-12">
              <Label htmlFor="topic" className="text-right">
                {d.image}
              </Label>
              <div className="col-span-3 flex flex-col">
                <Input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  className=""
                />
                <Button
                  variant="default"
                  disabled={isLoading}
                  onClick={() => handleUpload()}
                  className="mt-2 hover:opacity-60 "
                >
                  {uploaded ? d.upload : d.uploaded}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 w-full items-center gap-4">
              <Label className="text-right">{d.addTags}</Label>
              <CustomAsyncSelect tags={tags} setTags={setTags} />
            </div>
            <SelectVisibilty d={d} />
            {visibility === "PRIVATE" && <ShareWith />}
          </div>
        </div>
      )}
    </>
  );
}
