import React, { useEffect } from "react";
// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
// Global State
import { setIsLoggedIn } from "./Redux/app";
// Components
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
import Game from "./pages/Game/Game";
import Footer from "./components/Footer/Footer";
// Components
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  // set to currentUser
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }, []);
  return (
    <Router>
      {/* <div style={{ display: "flex", flexDirection: "column", height: "100%" }}> */}
      <Navbar />
      {/* <div style={{ display: "flex", background: "red", height: "100%" }}> */}
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<CreateAcc />} />
        <Route path="/gameDetail" element={<Game />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </div> */}
      {/* </div> */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
