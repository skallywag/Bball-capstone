import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  // useEffect(() => {
  //   async function getNews() {
  //     try {
  //       const newsData = await axios.get(
  //         "https://scrambled-api.mysportsfeeds.com/v2.0/pull/nba/2021-2022-regular/latest_updates.json"
  //       );
  //     } catch {
  //       console.error();
  //     }
  //   }
  //   getNews();
  // }, []);
  return (
    <div>
      <div>
        <ul>
          {news.map((item, idx) => {
            return (
              <div>
                <li key={idx}>{item.Title}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default News;
