import React from "react";
import "./Home.scss";
// import "../../../public/page-backgrounds/home.jpg"
const backGroundImg =
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80";

const Home = () => {
  return (
    <div>
      <img className="back-img" src={backGroundImg} alt="" />
      <h1>Home PAge</h1>
    </div>
  );
};

export default Home;
