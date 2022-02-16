import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/ErrorPage";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./pages/News/News";
import Standings from "./pages/Standings/Standings";
import Search from "./pages/Search/Search";
import CreateAcc from "./pages/Sign-up/CreateAcc";
import CreateGame from "./pages/Create/CreateGame";
import Profile from "./pages/Profile/Profile";
import "./App.css";

function App() {
  // set to currentUser
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const loginUser = () => setIsLoggedIn(!isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Router>
      {/* <div style={{ display: "flex", flexDirection: "column", height: "100%" }}> */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        logFunction={loginUser}
      />
      {/* <div style={{ display: "flex", background: "red", height: "100%" }}> */}
      <Sidebar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<CreateAcc />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
      {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
