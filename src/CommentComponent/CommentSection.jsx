import React, { useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
const CommentSection = ({
  comments,
  postId,
  onCreateComment,
  onDeleteComment,
}) => {
  return (
    <div className="comments">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <button
            className="delete-button"
            onClick={() => onDeleteComment(comment.id)}
          >
            Delete Comment
          </button>
        </div>
      ))}
      <CommentForm postId={postId} onCreateComment={onCreateComment} />
    </div>
  );
};

export default CommentSection;
