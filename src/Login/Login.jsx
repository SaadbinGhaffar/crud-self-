import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you will create a separate CSS file for styles

const Login = ({ setLoggedin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        setLoggedin(user);
        navigate(`/posts/${user.id}`);
      } else {
        setError("Username or Password is incorrect");
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Signup for First time
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
