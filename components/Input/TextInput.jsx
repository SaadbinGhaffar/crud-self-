import React from "react";
import "./TextInput.css";
const TextInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  error = "",
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field ${className} ${error ? "error" : ""}`}
        required={required}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default TextInput;
