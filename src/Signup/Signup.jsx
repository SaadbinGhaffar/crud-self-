import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import TextInput from "../../components/Input/TextInput";
import Navbar from "../Navbar/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
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
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage("Both fields are required.");
      hasError = true;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain a number and a special character.";
      hasError = true;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === formData.email)) {
      newErrors.email = "Username already exists. Choose another.";
      hasError = true;
    }

    setFieldErrors(newErrors);

    if (hasError) return;

    const newUser = {
      id: Date.now(),
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setMessage("Signup successful! Redirecting...");
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h2 className="signup-header">Create an Account</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <TextInput
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
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
            onClick={() => navigate("/login")}
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
    </div>
  );
};

export default Signup;
