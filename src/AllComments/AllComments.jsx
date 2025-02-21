// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const AllComments = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const postId = location.state?.postId;

//   // Fetch logged-in user from localStorage
//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

//   // Retrieve stored comments or initialize with state comments
//   const savedComments =
//     JSON.parse(localStorage.getItem(`comments_${postId}`)) ||
//     location.state?.comments ||
//     [];
//   const [comments, setComments] = useState(savedComments);

//   // Save comments to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
//   }, [comments, postId]);

//   // Function to add a new comment
//   const handleAddComment = async (body) => {
//     if (!body.trim()) {
//       alert("Comment cannot be empty.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/comments",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             postId,
//             body,
//             email: loggedInUser.email,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const newComment = await response.json();
//       const enhancedComment = { ...newComment, id: crypto.randomUUID() };

//       setComments((prevComments) => [...prevComments, enhancedComment]);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   // Function to delete a comment
//   const handleDelete = (commentId) => {
//     setComments((prevComments) =>
//       prevComments.filter((comment) => comment.id !== commentId)
//     );
//   };

//   // Function to update a comment
//   const handleUpdate = (commentId, updatedText) => {
//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId ? { ...comment, body: updatedText } : comment
//       )
//     );
//   };

//   return (
//     <div>
//       <h2>All Comments </h2>
//       <button onClick={() => navigate(-1)}>🔙 Back</button>

//       {loggedInUser && (
//         <div>
//           <textarea id="newComment" placeholder="Write a comment..."></textarea>
//           <button
//             onClick={() =>
//               handleAddComment(document.getElementById("newComment").value)
//             }
//           >
//             Add Comment
//           </button>
//         </div>
//       )}

//       {comments.map((comment) => (
//         <div
//           key={comment.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <p>
//             <strong>{comment.email}:</strong> {comment.body}
//           </p>

//           {loggedInUser &&
//             comment.email?.toLowerCase() ===
//               loggedInUser.email?.toLowerCase() && (
//               <div>
//                 <button onClick={() => handleDelete(comment.id)}>Delete</button>
//                 <button
//                   onClick={() => {
//                     const newText = prompt(
//                       "Enter updated comment:",
//                       comment.body
//                     );
//                     if (newText) handleUpdate(comment.id, newText);
//                   }}
//                 >
//                   Update
//                 </button>
//               </div>
//             )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllComments;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AllComments.css";
const AllComments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.postId;
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        // Fetch comments from API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const apiComments = await response.json();

        // Get locally stored comments
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];

        // Filter comments for the specific post
        const filteredApiComments = apiComments.filter(
          (comment) => comment.postId === postId
        );
        const filteredLocalComments = localComments.filter(
          (comment) => comment.postId === postId
        );

        // Combine and set comments
        setComments([...filteredApiComments, ...filteredLocalComments]);
        setMessage("Comments loaded successfully!");
      } catch (error) {
        setMessage(`Error loading comments: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    // Listen for storage events to update comments when changes occur
    const handleStorageChange = () => {
      const localComments =
        JSON.parse(localStorage.getItem("userComments")) || [];
      const filteredLocalComments = localComments.filter(
        (comment) => comment.postId === postId
      );
      setComments((prevComments) => {
        const apiComments = prevComments.filter((comment) => !comment.isLocal);
        return [...apiComments, ...filteredLocalComments];
      });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [postId]);

  const handleAddComment = async (body) => {
    if (!body.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          body: JSON.stringify({
            postId,
            body,
            email: loggedInUser.email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const newComment = await response.json();

      // Enhance the comment with additional properties
      const enhancedComment = {
        ...newComment,
        id: crypto.randomUUID(),
        isLocal: true,
        createdAt: new Date().toISOString(),
      };

      // Update comments state
      setComments((prevComments) => [...prevComments, enhancedComment]);

      // Update localStorage
      const localComments =
        JSON.parse(localStorage.getItem("userComments")) || [];
      localStorage.setItem(
        "userComments",
        JSON.stringify([...localComments, enhancedComment])
      );

      // Trigger storage event
      window.dispatchEvent(new Event("storage"));

      setMessage("Comment added successfully!");

      // Clear the textarea
      document.getElementById("newComment").value = "";
    } catch (error) {
      setMessage(`Error adding comment: ${error.message}`);
    }
  };

  const handleDelete = async (commentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (isConfirmed) {
      try {
        await fetch(
          `https://jsonplaceholder.typicode.com/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        // Update comments state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );

        // Update localStorage
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];
        const updatedLocalComments = localComments.filter(
          (comment) => comment.id !== commentId
        );
        localStorage.setItem(
          "userComments",
          JSON.stringify(updatedLocalComments)
        );

        // Trigger storage event
        window.dispatchEvent(new Event("storage"));

        setMessage("Comment deleted successfully!");
      } catch (error) {
        setMessage(`Error deleting comment: ${error.message}`);
      }
    }
  };

  const handleUpdate = async (commentId, updatedText) => {
    if (!updatedText.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            body: updatedText,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const updatedComment = await response.json();

      // Update comments state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                body: updatedText,
                updatedAt: new Date().toISOString(),
              }
            : comment
        )
      );

      // Update localStorage if it's a local comment
      const localComments =
        JSON.parse(localStorage.getItem("userComments")) || [];
      const updatedLocalComments = localComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              body: updatedText,
              updatedAt: new Date().toISOString(),
            }
          : comment
      );
      localStorage.setItem(
        "userComments",
        JSON.stringify(updatedLocalComments)
      );

      // Trigger storage event
      window.dispatchEvent(new Event("storage"));

      setMessage("Comment updated successfully!");
    } catch (error) {
      setMessage(`Error updating comment: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comments-container">
      <div className="comments-header">
        <h2>Comments</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      {loggedInUser && (
        <div className="comment-form">
          <textarea
            id="newComment"
            placeholder="Write a comment..."
            className="comment-textarea"
          />
          <button
            className="add-comment-button"
            onClick={() =>
              handleAddComment(document.getElementById("newComment").value)
            }
          >
            Add Comment
          </button>
        </div>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              {/* <strong>{comment.email}</strong> */}
              <span className="comment-date">
                {comment.createdAt &&
                  new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-body">{comment.body}</p>

            {loggedInUser &&
              comment.email?.toLowerCase() ===
                loggedInUser.email?.toLowerCase() && (
                <div className="comment-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => {
                      const newText = prompt(
                        "Enter updated comment:",
                        comment.body
                      );
                      if (newText) handleUpdate(comment.id, newText);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AllComments;
