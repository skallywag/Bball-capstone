import React, { useRef, useEffect } from "react";
import { init } from "ityped";

import "./Home.scss";
const homeImg = "https://images6.alphacoders.com/323/thumb-1920-323997.jpg";

const Home = () => {
  const textRef = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: false,
      typeSpeed: 120,
      backSpeed: 30,
      loop: true,
      strings: ["Anytime", "Anywhere"],
    });
  }, []);

  return (
    <div>
      <img className="back-img" src={homeImg} alt="basketball-img" />
      <div className="homePageHeader">
        <div>
          <span
            style={{ fontSize: "60px", color: "#cf5300", padding: "1px" }}
            ref={textRef}
          ></span>
        </div>
        <h1 className="homeTitle">Welcome To Eternal Hoops</h1>
        <p className="welcomeMsg">
          Never go to the gym or your place of exercise <br /> hoping there will
          be a group playing some hoops. <br />
        </p>
      </div>
    </div>
  );
};

export default Home;
