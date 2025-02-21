import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  newTitle,
  setNewTitle,
  newContent,
  setNewContent,
}) => {
  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
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
          <button onClick={onSave} className="save-button">
            Save
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
