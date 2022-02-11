import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import newsResponse from "./newsData";
console.log(newsResponse);
const News = () => {
  const [news, setNews] = useState([]);

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
