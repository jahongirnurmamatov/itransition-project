import { useResponseStore } from "@/store/responseStore";
import { useTemplateStore } from "@/store/templateStore";
import React from "react";
import { BsChatLeftQuote } from "react-icons/bs";
import { TbMoodEmpty } from "react-icons/tb";
import BarChartView from "./BarChartView";
import { useLanguageStore } from "@/store/languageStore";

const AggregatedView = () => {
  const { dictionary: d } = useLanguageStore();
  const { title, topic, imageUrl, description, previewImg } =
    useTemplateStore();
  const { responses } = useResponseStore();

  if (responses?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <TbMoodEmpty className="size-10 text-gray-500" />
          <h1 className="text-2xl text-gray-500">{d.noSubmissionsYet}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 mb-10">
      <div className="w-full  min-h-screen flex flex-col items-start">
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
          <h1 className="text-2xl text-center font-bold text-primary">
            {title}
          </h1>
          <div className="flex justify-end my-2">
            {topic.trim("").length > 0 && (
              <div className="flex gap-2">
                <BsChatLeftQuote className="size-5 text-gray-500 " />
                <p className="text-sm text-gray-600">{topic}</p>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm font-light text-gray-500">{description}</p>
          )}
          <div className="flex flex-col gap-4 my-5">
            {responses.length > 0 &&
              responses.map((response, idx) => (
                <div
                  className="w-full bg-primary-foreground rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
                  key={idx}
                >
                  <p className="text-lg font-semibold font-sans">
                    {response.label}
                  </p>
                  {response.description && (
                    <p className="text-sm font-light text-gray-500">
                      {response.description}
                    </p>
                  )}
                  <div className="w-[80%] mx-auto">
                    {["checkbox", "radio"].includes(response.type) && (
                      <BarChartView
                        options={response.options}
                        description={
                          "Chart shows how many times user selected these options"
                        }
                      />
                    )}
                  </div>
                  {response.type === "number" && (
                    <p className="text-sm font-bold">
                      <span className="text-gray-500">Average:</span>
                      {response.data.average}
                    </p>
                  )}
                  {["textarea", "image"].includes(response.type) && (
                    <p className="text-sm font-bold">
                      <span className="text-gray-500">Total Responses:</span>
                      {response._count.responseId}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregatedView;
