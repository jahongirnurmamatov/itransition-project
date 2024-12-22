
import { useTemplateStore } from "@/store/templateStore"
import PreviewComponent from "@/components/createForm/Preview";
import Comments from "@/components/userInteraction/Comments";
import CommentBox from "@/components/userInteraction/CommentBox";
import { Separator } from "@/components/ui/separator";
import { Interaction } from "@/components/userInteraction/Interaction";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mui/material";
import Loading from "@/components/loading/Loading";

const Template = () => {
  const {  getTemplateById, isLoading, error } = useTemplateStore();
  const { templateId } = useParams();

  useEffect(() => {
    console.log(templateId)
    if (templateId) {
      getTemplateById(templateId);
    }
  }, [templateId, getTemplateById]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
        <PreviewComponent />
        <div className="flex items-center justify-center">
          <Button variant="contained" className=" w-[200px] mx-auto text-center">Submit Form</Button>
        </div>
        <div className="flex flex-col gap-2 px-20 ">
            <Separator className="my-5"	 />
            <Interaction />
            <Separator className="my-5"	 />
            <CommentBox />
            <Comments />
        </div>
    </div>
  );
};

export default Template;
