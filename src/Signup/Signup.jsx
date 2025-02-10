import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Both fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === username)) {
      setMessage("Username already exists. Choose another.");
      return;
    }

    const nextId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    /// Create new user
    const newUser = { id: nextId, username, password };

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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
