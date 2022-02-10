import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import teams from "./teamData";
import "./Standings.css";

const west = teams.filter((team) => {
  return team.Conference === "Western";
});
const east = teams.filter((team) => {
  return team.Conference === "Eastern";
});

const Standings = () => {
  const [standings, setStandings] = useState(west);
  return (
    <div className="standings-con">
      <div className="toggle-btn-con">
        <button onClick={() => setStandings(west)} className="toggle-btn">
          Western
        </button>
        <button onClick={() => setStandings(east)} className="toggle-btn">
          Eastern
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>GB</th>
            <th>Conf</th>
            <th>Home</th>
            <th>Away</th>
            <th>L10</th>
            <th>Strk</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.TeamID}>
              <td>{team.Name}</td>
              <td>{team.Wins}</td>
              <td>{team.Losses}</td>
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
  );
};

export default Standings;

// const [standings, setStandings] = useState([]);

// setStandings([...standings, response]);
// useEffect(() => {
//   async function getStandings() {
//     try {
//       const res = await axios.get(
//
//       );
//     } catch {
//       console.error("Request failed");
//     }
//   }
// }, []);
