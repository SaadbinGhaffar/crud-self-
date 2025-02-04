// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./Posts.css";

// const Posts = () => {
//   const { userId } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [editPostId, setEditPostId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editContent, setEditContent] = useState("");
//   const [message, setMessage] = useState("");
//   const [commentFields, setCommentFields] = useState({});
//   const [editCommentId, setEditCommentId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editBody, setEditBody] = useState("");

//   useEffect(() => {
//     const fetchPostsAndComments = async () => {
//       try {
//         const postsResponse = await axios.get("http://localhost:3000/posts");
//         const userPosts = postsResponse.data.filter(
//           (post) => post.authorId === parseInt(userId)
//         );
//         setPosts(userPosts);

//         const commentsResponse = await axios.get(
//           "http://localhost:3000/comments"
//         );
//         setComments(commentsResponse.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchPostsAndComments();
//   }, [userId]);

//   const handleCreatePost = async () => {
//     if (!title.trim() || !content.trim()) {
//       setMessage("Title and content cannot be empty.");
//       return;
//     }

//     const post = {
//       title,
//       content,
//       authorId: parseInt(userId),
//     };

//     try {
//       const response = await axios.post("http://localhost:3000/posts", post);
//       setPosts([...posts, response.data]);
//       setTitle("");
//       setContent("");
//       setMessage("Post created successfully!");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       setMessage("Error creating post. Please try again.");
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       await axios.delete(`http://localhost:3000/posts/${postId}`);
//       setPosts(posts.filter((post) => post.id !== postId));
//       console.log(`Post ${postId} deleted successfully`);
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleEditPost = (post) => {
//     setEditPostId(post.id);
//     setEditTitle(post.title);
//     setEditContent(post.content);
//   };

//   const handleSaveEditPost = async () => {
//     if (!editTitle.trim() || !editContent.trim()) {
//       setMessage("Title and content cannot be empty.");
//       return;
//     }

//     const updatedPost = {
//       title: editTitle,
//       content: editContent,
//       authorId: parseInt(userId),
//     };

//     try {
//       await axios.put(`http://localhost:3000/posts/${editPostId}`, updatedPost);
//       setPosts(
//         posts.map((post) =>
//           post.id === editPostId
//             ? { ...post, title: editTitle, content: editContent }
//             : post
//         )
//       );
//       setEditPostId(null);
//       setEditTitle("");
//       setEditContent("");
//       setMessage("Post updated successfully!");
//     } catch (error) {
//       console.error("Error updating post:", error);
//       setMessage("Error updating post. Please try again.");
//     }
//   };

//   const handleCreateComment = async (postId) => {
//     const { name, body } = commentFields[postId] || {};

//     if (!name?.trim() || !body?.trim()) {
//       setMessage("Comment fields are required.");
//       return;
//     }

//     const newComment = {
//       postId,
//       name,
//       body,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/comments",
//         newComment
//       );
//       setComments([...comments, response.data]);
//       setCommentFields((prev) => ({
//         ...prev,
//         [postId]: { name: "", body: "" },
//       }));
//       setMessage("Comment added successfully!");
//     } catch (error) {
//       console.error("Error creating comment:", error);
//       setMessage("Error creating comment. Please try again.");
//     }
//   };

//   const handleCommentChange = (postId, field, value) => {
//     setCommentFields((prev) => ({
//       ...prev,
//       [postId]: {
//         ...prev[postId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:3000/comments/${commentId}`);
//       setComments(comments.filter((comment) => comment.id !== commentId));
//       console.log(`Comment ${commentId} deleted successfully`);
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   const handleEditComment = (comment) => {
//     setEditCommentId(comment.id);
//     setEditName(comment.name);
//     setEditBody(comment.body);
//   };

//   const handleSaveEditComment = async () => {
//     if (!editName.trim() || !editBody.trim()) {
//       setMessage("Name and body cannot be empty.");
//       return;
//     }

//     const updatedComment = {
//       name: editName,
//       body: editBody,
//       postId: comments.find((comment) => comment.id === editCommentId)?.postId,
//     };

//     try {
//       await axios.put(
//         `http://localhost:3000/comments/${editCommentId}`,
//         updatedComment
//       );
//       setComments(
//         comments.map((comment) =>
//           comment.id === editCommentId
//             ? { ...comment, name: editName, body: editBody }
//             : comment
//         )
//       );
//       setEditCommentId(null);
//       setEditName("");
//       setEditBody("");
//       setMessage("Comment updated successfully!");
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       setMessage("Error updating comment. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="header">User {userId}'s Posts</h2>
//       <h3 className="subheader">
//         Total {posts.length} {posts.length > 1 ? "Posts" : "Post"}
//       </h3>

//       {posts.map((post) => (
//         <div className="post" key={post.id}>
//           {editPostId === post.id ? (
//             <div className="edit-section">
//               <input
//                 type="text"
//                 placeholder="Edit Title"
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//                 className="input"
//               />
//               <textarea
//                 placeholder="Edit Content"
//                 value={editContent}
//                 onChange={(e) => setEditContent(e.target.value)}
//                 className="textarea"
//               />
//               <button className="save-button" onClick={handleSaveEditPost}>
//                 Save
//               </button>
//               <button
//                 className="cancel-button"
//                 onClick={() => setEditPostId(null)}
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <>
//               <h2 className="post-id">Post ID: {post.id}</h2>
//               <h3 className="post-title">TITLE: {post.title}</h3>
//               <p className="post-content">DESCRIPTION: {post.content}</p>
//               <button
//                 className="edit-button"
//                 onClick={() => handleEditPost(post)}
//               >
//                 Edit Post
//               </button>
//               <button
//                 className="delete-button"
//                 onClick={() => handleDeletePost(post.id)}
//               >
//                 Delete Post
//               </button>
//               <button
//                 className="add-comment-button"
//                 onClick={() =>
//                   setCommentFields((prev) => ({
//                     ...prev,
//                     [post.id]: { name: "", body: "" },
//                   }))
//                 }
//               >
//                 Add Comment
//               </button>
//             </>
//           )}

//           <div className="comments">
//             <h4>Comments</h4>
//             {comments
//               .filter((comment) => comment.postId === post.id)
//               .map((comment) => (
//                 <div key={comment.id}>
//                   {editCommentId === comment.id ? (
//                     <div className="edit-section">
//                       <input
//                         type="text"
//                         placeholder="Edit Name"
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                         className="input"
//                       />
//                       <textarea
//                         placeholder="Edit Body"
//                         value={editBody}
//                         onChange={(e) => setEditBody(e.target.value)}
//                         className="textarea"
//                       />
//                       <button
//                         className="save-button"
//                         onClick={handleSaveEditComment}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="cancel-button"
//                         onClick={() => setEditCommentId(null)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="comment">
//                       <p>
//                         <strong>{comment.name}:</strong> {comment.body}
//                       </p>
//                       <button
//                         className="edit-button"
//                         onClick={() => handleEditComment(comment)}
//                       >
//                         Edit Comment
//                       </button>
//                       <button
//                         className="delete-button"
//                         onClick={() => handleDeleteComment(comment.id)}
//                       >
//                         Delete Comment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}

//       <div className="form-section">
//         <h3>Create New Post</h3>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input"
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="textarea"
//         />
//         <button className="submit-button" onClick={handleCreatePost}>
//           Create Post
//         </button>
//       </div>

//       {message && (
//         <p
//           className={`message ${
//             message.includes("successfully") ? "success" : "error"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [message, setMessage] = useState("");
  const [commentFields, setCommentFields] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const postsResponse = await axios.get("http://localhost:3000/posts");
        const userPosts = postsResponse.data.filter(
          (post) => post.authorId === parseInt(userId)
        );
        setPosts(userPosts);

        const commentsResponse = await axios.get(
          "http://localhost:3000/comments"
        );
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPostsAndComments();
  }, [userId]);

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content cannot be empty.");
      return;
    }

    const post = {
      title,
      content,
      authorId: parseInt(userId),
    };

    try {
      const response = await axios.post("http://localhost:3000/posts", post);
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
      setMessage("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Error creating post. Please try again.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      console.log(`Post ${postId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEditPost = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setMessage("Title and content cannot be empty.");
      return;
    }

    const updatedPost = {
      title: editTitle,
      content: editContent,
      authorId: parseInt(userId),
    };

    try {
      await axios.put(`http://localhost:3000/posts/${editPostId}`, updatedPost);
      setPosts(
        posts.map((post) =>
          post.id === editPostId
            ? { ...post, title: editTitle, content: editContent }
            : post
        )
      );
      setEditPostId(null);
      setEditTitle("");
      setEditContent("");
      setMessage("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage("Error updating post. Please try again.");
    }
  };

  const handleCreateComment = async (postId) => {
    const { name, body } = commentFields[postId] || {};

    if (!name?.trim() || !body?.trim()) {
      setMessage("Comment fields are required.");
      return;
    }

    const newComment = {
      postId,
      name,
      body,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/comments",
        newComment
      );
      setComments([...comments, response.data]);
      setCommentFields((prev) => ({
        ...prev,
        [postId]: { name: "", body: "" },
      }));
      setMessage("Comment added successfully!");
    } catch (error) {
      console.error("Error creating comment:", error);
      setMessage("Error creating comment. Please try again.");
    }
  };

  const handleCommentChange = (postId, field, value) => {
    setCommentFields((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: value,
      },
    }));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      console.log(`Comment ${commentId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditName(comment.name);
    setEditBody(comment.body);
  };

  const handleSaveEditComment = async () => {
    if (!editName.trim() || !editBody.trim()) {
      setMessage("Name and body cannot be empty.");
      return;
    }

    const updatedComment = {
      name: editName,
      body: editBody,
      postId: comments.find((comment) => comment.id === editCommentId)?.postId,
    };

    try {
      await axios.put(
        `http://localhost:3000/comments/${editCommentId}`,
        updatedComment
      );
      setComments(
        comments.map((comment) =>
          comment.id === editCommentId
            ? { ...comment, name: editName, body: editBody }
            : comment
        )
      );
      setEditCommentId(null);
      setEditName("");
      setEditBody("");
      setMessage("Comment updated successfully!");
    } catch (error) {
      console.error("Error updating comment:", error);
      setMessage("Error updating comment. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="header">User {userId}'s Posts</h2>
      <h3 className="subheader">
        Total {posts.length} {posts.length > 1 ? "Posts" : "Post"}
      </h3>

      {posts.map((post) => (
        <div className="post" key={post.id}>
          {editPostId === post.id ? (
            <div className="edit-section">
              <input
                type="text"
                placeholder="Edit Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input"
              />
              <textarea
                placeholder="Edit Content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="textarea"
              />
              <button className="save-button" onClick={handleSaveEditPost}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setEditPostId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h2 className="post-id">Post ID: {post.id}</h2>
              <h3 className="post-title">TITLE: {post.title}</h3>
              <p className="post-content">DESCRIPTION: {post.content}</p>
              <button
                className="edit-button"
                onClick={() => handleEditPost(post)}
              >
                Edit Post
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete Post
              </button>
              <button
                className="add-comment-button"
                onClick={() =>
                  setCommentFields((prev) => ({
                    ...prev,
                    [post.id]: { name: "", body: "" },
                  }))
                }
              >
                Add Comment
              </button>
            </>
          )}

          {commentFields[post.id] && (
            <div className="comment-form">
              <input
                type="text"
                placeholder="Your Name"
                value={commentFields[post.id].name}
                onChange={(e) =>
                  handleCommentChange(post.id, "name", e.target.value)
                }
                className="input"
              />
              <textarea
                placeholder="Your Comment"
                value={commentFields[post.id].body}
                onChange={(e) =>
                  handleCommentChange(post.id, "body", e.target.value)
                }
                className="textarea"
              />
              <button
                className="submit-button"
                onClick={() => handleCreateComment(post.id)}
              >
                Submit Comment
              </button>
            </div>
          )}

          <div className="comments">
            <h4>Comments</h4>
            {comments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => (
                <div key={comment.id}>
                  {editCommentId === comment.id ? (
                    <div className="edit-section">
                      <input
                        type="text"
                        placeholder="Edit Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input"
                      />
                      <textarea
                        placeholder="Edit Body"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="textarea"
                      />
                      <button
                        className="save-button"
                        onClick={handleSaveEditComment}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setEditCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="comment">
                      <p>
                        <strong>{comment.name}:</strong> {comment.body}
                      </p>
                      <button
                        className="edit-button"
                        onClick={() => handleEditComment(comment)}
                      >
                        Edit Comment
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete Comment
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="form-section">
        <h3>Create New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
        />
        <button className="submit-button" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>

      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Posts;
