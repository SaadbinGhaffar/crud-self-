import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setLoggedin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (user) {
      // Save the logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedin(user);
      navigate(`/posts/${user.id}`);
    } else {
      setError("Username or Password is incorrect");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-container">
          <input
            type="text"
            name="username"
            className="input-field"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="login-btn">
            Login
          </button>
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Signup for First Time
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
