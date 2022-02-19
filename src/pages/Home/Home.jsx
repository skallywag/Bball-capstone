import React from "react";
import "./Home.scss";
// import "../../../public/page-backgrounds/home.jpg"
const backGroundImg =
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80";

const img2 = "https://images6.alphacoders.com/323/thumb-1920-323997.jpg";

const Home = () => {
  return (
    <div>
      <img className="back-img" src={img2} alt="" />
      <div className="homePageHeader">
        <h1 className="homeTitle">Welcome To Infinity Hoops</h1>
        <p className="welcomeMsg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quaerat
          ut laborum reprehenderit numquam, maxime libero mollitia, ipsa minus
          quas sit aperiam repellendus officia veritatis, voluptatibus unde
          porro? Doloribus, incidunt?
        </p>
      </div>
    </div>
  );
};

export default Home;
