import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function getNews() {
      try {
        const response = await axios.get();
        const newsData = response.data;
        console.log(response.data);
        setNews(newsData);
        // console.log(news);
      } catch {
        console.error("failed to get news");
      }
    }
    getNews();
  }, []);

  return (
    <div>
      <div>
        <ul>
          {news.map((item, idx) => {
            return (
              <div>
                <li key={idx}>{item.Title}</li>
                {/* <li>{item.status}</li> */}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default News;
