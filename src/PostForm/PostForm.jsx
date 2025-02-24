import React, { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import TextInput from "../../components/Input/TextInput";

const PostForm = ({ onCreatePost, logoutUser, isSubmitting }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { title: "", content: "" };

    // validating title
    if (!title.trim()) {
      newErrors.title = "Title is required";
      formIsValid = false;
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
      formIsValid = false;
    } else if (title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      formIsValid = false;
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
      formIsValid = false;
    } else if (content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Create post
      await onCreatePost(title.trim(), content.trim());

      setTitle("");
      setContent("");
      setErrors({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to create post. Please try again.",
      }));
    }
  };

  return (
    <div className="form-section">
      <h3>Create New Post</h3>
      <TextInput
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          // Clear error when user starts typing
          if (errors.title) {
            setErrors((prev) => ({ ...prev, title: "" }));
          }
        }}
        error={errors.title}
        className="input"
      />
      <TextInput
        type="textarea"
        name="content"
        placeholder="Description"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          // Clear error when user starts typing
          if (errors.content) {
            setErrors((prev) => ({ ...prev, content: "" }));
          }
        }}
        error={errors.content}
        className="textarea"
      />
      <PrimaryButton
        onClick={handleSubmit}
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Post"}
      </PrimaryButton>

      {errors.general && <p className="error-message">{errors.general}</p>}
    </div>
  );
};

export default PostForm;
