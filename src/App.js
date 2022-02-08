import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ErrorPage from "./pages/Error/ErrorPage";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./pages/News/News";
import Games from "./pages/Games/Games";
import Search from "./pages/Search/Search";
import CreateAcc from "./pages/Sign-up/CreateAcc";

import "./App.css";
import Login from "./components/Login/Login";

function App() {
  // redux toolkit

  return (
    <Router>
      {/* <div style={{ display: "flex", flexDirection: "column", height: "100%" }}> */}
      <Navbar />
      {/* <div style={{ display: "flex", background: "red", height: "100%" }}> */}
      <Sidebar />
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/games" element={<Games />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<CreateAcc />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
