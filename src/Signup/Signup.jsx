import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage("Both fields are required.");
      return;
    }

    // const usernamePattern = /^[a-zA-Z0-9_]+$/; // Only alphanumeric and underscore
    // if (!usernamePattern.test(formData.username)) {
    //   setMessage(
    //     "Username can only contain letters, numbers, and underscores."
    //   );
    //   return;
    // }

    // // Optional: Password validation (e.g., at least 6 characters, contains number and special character)
    // const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/; // At least 6 characters, a number, and a special char
    // if (!passwordPattern.test(formData.password)) {
    //   setMessage(
    //     "Password must be at least 6 characters long and contain a number and a special character."
    //   );
    //   return;
    // }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === formData.username)) {
      setMessage("Username already exists. Choose another.");
      return;
    }

    /// Create new user
    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
    };

    ////// Saving user to localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setMessage("Signup successful! Redirecting...");
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="signup-button secondary"
        >
          Go to Login
        </button>
      </form>
      {message && (
        <p
          className={`signup-message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
