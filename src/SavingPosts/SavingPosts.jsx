import React from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

const SavingPosts = ({
  newTitle,
  setNewTitle,
  newContent,
  setNewContent,
  handleSavePost,
  setEditPost,
}) => {
  return (
    <div className="edit-section">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="input"
        placeholder="Edit Title"
      />
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="textarea"
        placeholder="Edit Description"
      />
      <div className="button-group">
        {/* <PrimaryButton onClick={handleSavePost} className="save-button">
          Save
        </PrimaryButton> */}
        <SecondaryButton
          onClick={() => setEditPost(false)}
          className="cancel-button"
        >
          Cancel
        </SecondaryButton>
      </div>
    </div>
  );
};

export default SavingPosts;
