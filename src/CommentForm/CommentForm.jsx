import React, { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

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
      <PrimaryButton onClick={handleSubmit} className="submit-button">
        Submit Comment
      </PrimaryButton>
    </div>
  );
};

export default CommentForm;
