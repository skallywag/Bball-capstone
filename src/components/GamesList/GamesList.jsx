import React from 'react'
import { Link } from 'react-router-dom';
import qs from "query-string"
import "./GamesList.scss"

const GamesList = ({gamesList}) => {
  return (
    <div className="gameCard-con">
          {gamesList.map((game) => { 
            const searchParam = qs.stringify({
              gameId: game.id,
            })
            return (
              <Link to={`/gameDetail?${searchParam}`} className="gameLink" key={game.id}>
                <div className="gameCard">
                  <div className="gameContent">
                    <h1 className="gameLocation">Location: {game.venue}</h1>
                    <span className="gameCity">{game.city}, UT</span>
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
  )
}

export default GamesList