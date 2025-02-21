import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Posts from "./Posts/Posts";
import { useState } from "react";
import Signup from "./Signup/Signup";
import ShowPosts from "./ShowPosts/ShowPosts";
import AllComments from "./AllComments/AllComments";
import SavingPosts from "./SavingPosts/SavingPosts";
import EditPost from "./EditPost/EditPost";

const App = () => {
  const [loggedin, setLoggedin] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowPosts />} />

        <Route path="/login" element={<Login setLoggedin={setLoggedin} />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-comments" element={<AllComments />} />
        <Route path="/saving-posts" element={<SavingPosts />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
};

export default App;
