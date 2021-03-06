import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import teams from "./teamData";
import "./Standings.scss";
const img = "https://wallpapercave.com/wp/wp7673086.jpg";

const west = teams.filter((team) => {
  return team.Conference === "Western";
});
const westRankings = west.sort((b, a) => {
  return a.Wins - b.Wins;
});

const east = teams.filter((team) => {
  return team.Conference === "Eastern";
});

const eastRankings = east.sort((b, a) => {
  return a.Wins - b.Wins;
});

const Standings = () => {
  const [standings, setStandings] = useState(westRankings);

  // useEffect(() => {
  //   async function getStandings() {
  //     try {
  //       const response = await axios.get(
  //         ""
  //       );
  //       const teams = response.data;
  //     } catch {
  //       console.error();
  //     }
  //   }
  //   getStandings();
  // }, []);
  return (
    <div className="standings-con">
      <img className="back-img" src={img} alt="" />
      <div className="toggle-btn-con">
        <button
          onClick={() => setStandings(westRankings)}
          className="toggle-btn"
        >
          Western
        </button>
        <button
          onClick={() => setStandings(eastRankings)}
          className="toggle-btn"
        >
          Eastern
        </button>
      </div>
      <div className="table-con">
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>W</th>
              <th>L</th>
              <th>Pct</th>
              <th>GB</th>
              <th>Conf</th>
              <th>Home</th>
              <th>Away</th>
              <th>L10</th>
              <th>Strk</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, idx) => (
              <tr key={team.TeamID}>
                <td>
                  <img
                    alt="logo"
                    className="nba-logo"
                    src={`/nbaIcons/${team.Name.toLowerCase()}.png`}
                  />
                  {team.Name}
                </td>
                <td>{team.Wins}</td>
                <td>{team.Losses}</td>
                <td>{team.Percentage}</td>
                <td>{team.GamesBack}</td>
                <td>
                  {team.ConferenceWins}-{team.ConferenceLosses}
                </td>
                <td>
                  {team.HomeWins}-{team.HomeLosses}
                </td>
                <td>
                  {team.AwayWins}-{team.AwayLosses}
                </td>
                <td>
                  {team.LastTenWins}-{team.LastTenLosses}
                </td>
                <td>{team.StreakDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
