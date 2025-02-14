import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import TextInput from "../../components/Input/TextInput";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
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
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage("Both fields are required.");
      hasError = true;
    }

    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores.";
      hasError = true;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain a number and a special character.";
      hasError = true;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.username === formData.username)) {
      newErrors.username = "Username already exists. Choose another.";
      hasError = true;
    }

    setFieldErrors(newErrors);

    if (hasError) return;

    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setMessage("Signup successful! Redirecting...");
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <TextInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
          className="signup-input"
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          className="signup-input"
        />
        <PrimaryButton type="submit" className="signup-button">
          Sign Up
        </PrimaryButton>
        <SecondaryButton
          onClick={() => navigate("/")}
          className="signup-button secondary"
        >
          Go to Login
        </SecondaryButton>
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
