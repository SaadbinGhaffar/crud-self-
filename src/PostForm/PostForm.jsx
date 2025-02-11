import React, { useState } from "react";

const PostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    onCreatePost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="form-section">
      <h3>Create New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea"
      />
      <button className="submit-button" onClick={handleSubmit}>
        Create Post
      </button>
    </div>
  );
};

export default PostForm;
