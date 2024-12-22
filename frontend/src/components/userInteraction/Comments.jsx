import { useAuthStore } from '@/store/authStore';
import { useCommentStore } from '@/store/commentStore';
import React, { useEffect, useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import { formatDistanceToNow } from 'date-fns';
import { EditDeleteDropDown } from './EditDeleteDropDown';
import { Input } from '@mui/material';

const Comments = () => {
  const { user } = useAuthStore();
  const { templateId } = useParams();
  const { getComments, isCommentLoading, commentError, comments, editComment } = useCommentStore();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    getComments(templateId);
  }, [templateId, getComments]);

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
      <div className="flex flex-col items-start justify-start gap-4 my-5 ">
        {comments.map((comment, index) => (
          <div key={index} className="flex justify-start gap-3">
            <div className="flex">
              {comment?.user?.avatar ? (
                <img
                  src={comment?.user?.avatar}
                  alt={comment?.user.username}
                  className="size-6 rounded-full"
                />
              ) : (
                <FaCircleUser className="size-6 text-gray-500" />
              )}
            </div>
            <div className="flex rounded-lg bg-slate-200 py-2 px-4 min-w-100px] items-center gap-10 justify-between">
              <div className="flex flex-col items-start justify-start gap-0">
                <span className="font-bold">{comment?.user?.username}</span>
                {editCommentId === comment.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      multiline
                      className="text-sm w-[300px]"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button
                      onClick={() => handleSave(comment.id)}
                      className="text-blue-500 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span>{comment.content}</span>
                )}
                <p className="text-xs text-gray-500 place-self-start">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </p>
              </div>
              {comment.userId === user.id && (
                <EditDeleteDropDown
                  setEdit={() => handleEdit(comment.id, comment.content)}
                  commentId={comment.id}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
