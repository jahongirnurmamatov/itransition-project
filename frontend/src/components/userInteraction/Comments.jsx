import { useAuthStore } from "@/store/authStore";
import { useCommentStore } from "@/store/commentStore";
import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { formatDistanceToNow } from "date-fns";
import { EditDeleteDropDown } from "./EditDeleteDropDown";
import { Input } from "@mui/material";
import { useTemplateStore } from "@/store/templateStore";
import { FaCrown } from "react-icons/fa";
import { useListenComments } from "@/hooks/useListenComments";
import { useLanguageStore } from "@/store/languageStore";

const Comments = () => {
  const { authUser: user } = useAuthStore();
  const { isCommentLoading, commentError, comments, editComment } =
    useCommentStore();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { templateOwner } = useTemplateStore();
  const { dictionary: d } = useLanguageStore();
  useListenComments();

  const handleEdit = (commentId, content) => {
    setEditCommentId(commentId);
    setEditedContent(content);
  };

  const handleSave = (commentId) => {
    editComment(commentId, editedContent);
    setEditCommentId(null);
    setEditedContent("");
  };

  if (isCommentLoading) {
    return <Loading />;
  }
  if (commentError) {
    return <div className="text-center text-red-500">{commentError}</div>;
  }

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Comments</h1>
      {comments.length === 0 ? (
        <p className="text-center italic text-gray-500 mt-5">No comments yet</p>
      ) : (
        <div className="flex flex-col items-start justify-start gap-4 my-5 ">
          {comments.map((comment, index) => (
            <div key={index} className="flex justify-start gap-3">
              <div className="flex">
                {comment?.user?.avatar ? (
                  <img
                    src={comment?.user?.avatar}
                    alt={comment?.user.username}
                    className="size-8 rounded-full"
                  />
                ) : (
                  <FaCircleUser className="size-8 text-gray-500" />
                )}
              </div>
              <div className="flex rounded-lg bg-primary/[0.1] py-2 px-4 min-w-100px] items-center gap-10 justify-between">
                <div className="flex flex-col items-start justify-start gap-0">
                  <div className="flex gap-2">
                    <p className="font-bold ">{comment?.user?.username}</p>
                    {templateOwner?.id === comment?.user?.id && (
                      <p className="text-gray-500 text-sm flex gap-2 items-center">
                        <FaCrown size={12} /> <span>{d.author}</span>
                      </p>
                    )}
                  </div>
                  {editCommentId === comment?.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        multiline
                        className="text-sm w-[300px]"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button
                        onClick={() => handleSave(comment?.id)}
                        className="text-blue-500 text-sm"
                      >
                        {d.save}
                      </button>
                      <button
                        onClick={() => setEditCommentId(null)}
                        className="text-gray-500 text-sm"
                      >
                        {d.cancel}
                      </button>
                    </div>
                  ) : (
                    <span>{comment?.content}</span>
                  )}
                  <p className="text-xs text-gray-500 place-self-start">
                    {formatDistanceToNow(comment?.createdAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {comment?.userId === user?.id && (
                  <EditDeleteDropDown
                    setEdit={() => handleEdit(comment.id, comment.content)}
                    commentId={comment.id}
                    d={d}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
