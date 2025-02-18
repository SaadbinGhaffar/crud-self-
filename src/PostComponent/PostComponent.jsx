// import React, { useState } from "react";
// import EditButton from "../../components/Buttons/EditButton";

// const PostComponent = ({ post, onEdit, onDelete, children }) => {
//   const [showPosts, setShowPosts] = useState(false);

//   return (
//     <div className="post">
//       {showPosts ? (
//         <div>
//           <h3 className="post-title">TITLE: {post.title}</h3>
//           <p className="post-content">DESCRIPTION: {post.content}</p>
//           <EditButton onClick={() => onEdit(post)} className="edit-button">
//             Edit Post
//           </EditButton>
//           <DeleteButton onClick={onDelete} className="delete-button">
//             Delete Post
//           </DeleteButton>
//           {children}
//         </div>
//       ) : (
//         <button onClick={() => setShowPosts(true)}>
//           <p>Show Posts</p>
//         </button>
//       )}
//     </div>
//   );
// };

// export default PostComponent;
