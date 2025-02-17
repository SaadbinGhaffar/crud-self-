import React, { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const CommentForm = ({ postId, onCreateComment }) => {
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    onCreateComment(postId, body);

    setBody("");
  };

  return (
    <div className="comment-form">
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
