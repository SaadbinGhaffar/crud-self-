import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Both fields are required.");
      return;
    }

    try {
      // Fetch all users to determine the next ID
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      // Determine the next ID
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

      const newUser = {
        id: nextId,
        username,
        password,
      };

      // Create a new user
      const response = await axios.post("http://localhost:3000/users", newUser);

      if (response.status === 201) {
        setMessage("Signup successful!");
        setUsername("");
        setPassword("");
        setTimeout(() => navigate("/"), 2000); // Redirect to login page after success
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Signup failed. Please try again.");
    }
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
