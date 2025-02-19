import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Posts from "./Posts/Posts";
import { useState } from "react";
import Signup from "./Signup/Signup";
import ShowPosts from "./ShowPosts/ShowPosts";

const App = () => {
  const [loggedin, setLoggedin] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowPosts />} />

        <Route path="/login" element={<Login setLoggedin={setLoggedin} />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
