import React from "react";
import EditButton from "../../components/Buttons/EditButton";

const PostComponent = ({ post, onEdit, onDelete, children }) => (
  <div className="post">
    <h3 className="post-title">TITLE: {post.title}</h3>
    <p className="post-content">DESCRIPTION: {post.content}</p>
    <EditButton onClick={() => onEdit(post)} className="edit-button">
      Edit Post
    </EditButton>
    <DeleteButton onClick={onDelete} className="delete-button">
      Delete Post
    </DeleteButton>
    {children}
  </div>
);

export default PostComponent;
