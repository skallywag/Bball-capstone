import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import newsResponse from "./newsData";
// import
import "./News.css";

console.log(newsResponse);
const News = () => {
  const [news, setNews] = useState([]);

  return (
    <div className="news-con">
      {/* <h1 className="news-title">Latest News</h1> */}
      <div className="card-con">
        {newsResponse.map((newsCard) => {
          return (
            <div key={newsCard.NewsID} className="news-card">
              <div className="img-con">
                <img
                  className="news-img"
                  alt="newsimage"
                  src={`/newsImages/${newsCard.NewsID}.jpeg`}
                />
                <label className="source-tab">
                  <span className="source">{newsCard.Source}</span>
                </label>
              </div>
              <span className="team">Team: {newsCard.Team}</span>
              <div className="news-content">
                <h1 className="content-title">{newsCard.Title}</h1>
                <span className="content-update">
                  Last update: {newsCard.TimeAgo}
                </span>
              </div>
              <a>Read full story</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
