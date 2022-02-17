import React from "react";
import Signup from "../../components/Sign-up/Signup";
import "./CreateAcc.scss";
const img =
  "https://www.desktopbackground.org/download/o/2015/10/08/1023280_free-nba-wallpapers-at-hoopswallpapers-com-newest-nba-and_1920x1080_h.jpg";

const CreateAcc = () => {
  return (
    <>
      <img className="backg-img" src={img} alt="" />
      <Signup />
    </>
  );
};

export default CreateAcc;
