import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPost.css";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", body: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get post data from localStorage or API
    const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const posts = localPosts.find((p) => p.id === postId);

    if (posts) {
      setPost({ title: posts.title, body: posts.body || posts.content });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: post.title,
            body: post.body,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const updatedPost = await response.json();

      // Update localStorage
      const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      const updatedLocalPosts = localPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              title: post.title,
              body: post.body,
              content: post.body,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      localStorage.setItem("userPosts", JSON.stringify(updatedLocalPosts));

      // Trigger storage event
      window.dispatchEvent(new Event("storage"));

      setMessage("Post updated successfully!");
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(-1);
      }, 2000);
    } catch (error) {
      setMessage(`Error updating post: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving" : "Save Changes"}
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EditPost;
