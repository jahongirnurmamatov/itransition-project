import { useTemplateStore } from "@/store/templateStore";
import PreviewComponent from "@/components/createForm/Preview";
import Comments from "@/components/userInteraction/Comments";
import CommentBox from "@/components/userInteraction/CommentBox";
import { Separator } from "@/components/ui/separator";
import { Interaction } from "@/components/userInteraction/Interaction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";
import { useCommentStore } from "@/store/commentStore";
import { useResponseStore } from "@/store/responseStore";
import ToggleTab from "@/components/response/ToggleTab";
import AggregatedView from "@/components/response/AggregatedView";
import { ShareButton } from "@/components/template/ShareButton";
import { useAuthStore } from "@/store/authStore";
import EditButton from "@/components/template/EditButton";
import { IoIosEyeOff } from "react-icons/io";

const Template = () => {
  const {
    getTemplateById,
    isLoading,
    error,
    templateOwner,
    sharedWith,
    visibility,
  } = useTemplateStore();
  const { templateId } = useParams();
  const [showComments, setShowComments] = useState(false);
  const { getComments } = useCommentStore();
  const { getResponders, getAggregates, getMyresponse, response } =
    useResponseStore();
  const [showRight, setShowRight] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const url = window.location.href;
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (templateId) {
      const fetchData = async () => {
        await getTemplateById(templateId);
        await getComments(templateId);

        const responders = await getResponders(templateId);
        const submitted = responders
          .map((responder) => responder?.user?.id)
          .includes(authUser?.id);
        setIsSubmitted(submitted);
        if (submitted) {
          await getMyresponse(templateId);
        }
        await getAggregates(templateId);
      };

      fetchData();
    }
  }, [templateId, getTemplateById, getComments, getResponders, getAggregates]);
  if (
    visibility !== "PUBLIC" &&
    !sharedWith?.some((user) => user.userId === authUser?.id)&&
    templateOwner.id!==authUser.id
  ) {
    return (
      <div className="flex flex-col w-full h-2/3 gap-2 items-center justify-center">
        <IoIosEyeOff className="text-gray-500 size-10" />
        <h1 className="text-gray-500 text-2xl">
          You don't have permission to view the Template!
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-3 mb-10">
      <div className="flex justify-end items-center mr-20">
        <div className="flex items-center justify-center gap-2">
          <ToggleTab setShowRight={setShowRight} />
          <ShareButton url={url} />
          {templateOwner?.id === authUser?.id && (
            <EditButton templateId={templateId} />
          )}
        </div>
      </div>
      {!showRight ? (
        <div className="flex flex-col gap-3 mb-10">
          <PreviewComponent
            templateId={templateId}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            response={response}
          />
          <div className="flex flex-col gap-2 lg:px-40 md:px-20 px-10  ">
            <Separator className="my-5" />
            <Interaction
              templateId={templateId}
              setShowComments={setShowComments}
            />
            {showComments && (
              <>
                <Separator className="my-5" />
                <CommentBox />
                <Comments />
              </>
            )}
          </div>
        </div>
      ) : (
        <AggregatedView />
      )}
    </div>
  );
};

export default Template;
