import React, { useState } from "react";

const CommentForm = ({ postId, onCreateComment }) => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    onCreateComment(postId, name, body);
    setName("");
    setBody("");
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Your Comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="textarea"
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit Comment
      </button>
    </div>
  );
};

export default CommentForm;
