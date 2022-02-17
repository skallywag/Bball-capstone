import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import newsResponse from "./newsData";
import "./News.scss";

const News = () => {
  const [news, setNews] = useState([]);
  // useEffect(() => {
  //   async function getNews() {
  //     try {
  //       const response = await axios.get(
  //
  //       );
  //       const newsData = response.data;
  //       // console.log(newsData);
  //       setNews(newsData);
  //     } catch {
  //       console.error()
  //     }
  //   }
  //   getNews();
  // }, []);

  return (
    <div className="news-con">
      <div className="card-con">
        {/* <h1 className="news-title">Latest News</h1> */}
        {newsResponse.map((newsCard) => {
          return (
            <div key={newsCard.NewsID} className="news-card">
              <div className="img-con">
                <img
                  className="news-img"
                  alt="newsimage"
                  src={`/newsImages/${newsCard.TeamID}.jpeg`}
                />
                <label className="source-tab">
                  <span className="source">{newsCard.Source}</span>
                </label>
              </div>

              <div className="card-content">
                <span>Team: {newsCard.Team}</span>
                <span>Category: {newsCard.Categories.split(",")[0]}</span>
              </div>

              <div className="news-content">
                <h1 className="content-title">{newsCard.Title}</h1>
                <span className="content-update">
                  Last update: {newsCard.TimeAgo}
                </span>
                <a
                  href={newsCard.Url}
                  style={{ color: "white" }}
                  target="blank"
                >
                  Read full story here:
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <button>Top</button>
    </div>
  );
};

export default News;
