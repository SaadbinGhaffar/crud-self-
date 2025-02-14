import React from "react";

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
