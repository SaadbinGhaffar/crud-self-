import React from "react";

const DeleteButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
