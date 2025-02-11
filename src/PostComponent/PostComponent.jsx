import React from "react";

const PostComponent = ({ post, onEdit, onDelete, children }) => (
  <div className="post">
    <h2 className="post-id">Post ID: {post.id}</h2>
    <h3 className="post-title">TITLE: {post.title}</h3>
    <p className="post-content">DESCRIPTION: {post.content}</p>
    <button className="edit-button" onClick={() => onEdit(post)}>
      Edit Post
    </button>
    <button className="delete-button" onClick={onDelete}>
      Delete Post
    </button>
    {children}
  </div>
);

export default PostComponent;
