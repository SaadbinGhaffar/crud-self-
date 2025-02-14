import React from "react";

const EditButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default EditButton;
