import React, { useState } from "react";
import CommentSection from "../CommentComponent/CommentSection";

const PostSection = ({
  post,
  comments,
  onDeletePost,
  onEditPost,
  onCreateComment,
  onDeleteComment,
}) => {
  const [editPost, setEditPost] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);

  const handleSavePost = () => {
    onEditPost(post.id, newTitle, newContent);
    setEditPost(false);
  };

  return (
    <div className="post" key={post.id}>
      {editPost ? (
        <div className="edit-section">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="textarea"
          />
          <button className="save-button" onClick={handleSavePost}>
            Save
          </button>
          <button className="cancel-button" onClick={() => setEditPost(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="post-id">Post ID: {post.id}</h2>
          <h3 className="post-title">TITLE: {post.title}</h3>
          <p className="post-content">DESCRIPTION: {post.content}</p>
          <button className="edit-button" onClick={() => setEditPost(true)}>
            Edit Post
          </button>
          <button
            className="delete-button"
            onClick={() => onDeletePost(post.id)}
          >
            Delete Post
          </button>
        </div>
      )}

      <CommentSection
        comments={comments}
        postId={post.id}
        onCreateComment={onCreateComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
};

export default PostSection;
