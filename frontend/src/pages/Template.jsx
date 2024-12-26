
import { useTemplateStore } from "@/store/templateStore"
import PreviewComponent from "@/components/createForm/Preview";
import Comments from "@/components/userInteraction/Comments";
import CommentBox from "@/components/userInteraction/CommentBox";
import { Separator } from "@/components/ui/separator";
import { Interaction } from "@/components/userInteraction/Interaction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Loading from "@/components/loading/Loading";
import { useCommentStore } from "@/store/commentStore";
import { use } from "react";
import { useResponseStore } from "@/store/responseStore";

const Template = () => {
  const {  getTemplateById, isLoading, error } = useTemplateStore();
  const { templateId } = useParams();
  const [showComments,setShowComments] = useState(false);
  const {getComments} = useCommentStore();
  const {getResponses} = useResponseStore();

  useEffect(() => {
    if (templateId) {
      getTemplateById(templateId);
      getComments(templateId);
      getResponses(templateId);
    }
  }, [templateId, getTemplateById, getComments, getResponses]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-3 mb-10">
        <PreviewComponent  templateId={templateId}/>
        
        <div className="flex flex-col gap-2 lg:px-40 md:px-20 px-10  ">
            <Separator className="my-5"	 />
            <Interaction templateId={templateId} setShowComments={setShowComments}/>
          {
            showComments && <>
            <Separator className="my-5"	 />
            <CommentBox />
            <Comments /></>
          }
            
        </div>
    </div>
  );
};

export default Template;
