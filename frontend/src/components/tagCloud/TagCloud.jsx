import React, { useEffect } from "react";
import { useTagStore } from "@/store/tagStore";
import { useTemplateStore } from "@/store/templateStore";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

const TagCloud = () => {
  const { getTags, tags: existingTags, isLoading } = useTagStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = searchParams.get("tags")?.split(",") || [];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleTagClick = (tag) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (updatedTags.length > 0) {
      newSearchParams.set("tags", updatedTags.join(","));
    } else {
      newSearchParams.delete("tags");
    }
    setSearchParams(newSearchParams);

    if (pathname !== "/all-templates") {
      navigate(`/all-templates?tags=${updatedTags.join(",")}`);
    }
  };

  return (
    <div className="tag-cloud flex flex-wrap gap-2 p-4">
      {isLoading ? (
        <p>Loading tags...</p>
      ) : (
        existingTags?.map((tag) => (
          <Button
            key={tag.id || tag}
            onClick={() => handleTagClick(tag.name )}
            className={`tag-button px-4 py-2 rounded ${
              tags.includes(tag.name || tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-300`}
          >
            {tag.name}
          </Button>
        ))
      )}
    </div>
  );
};

export default TagCloud;
