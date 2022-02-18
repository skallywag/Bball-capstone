import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import qs from "query-string"
import "./GameDetail.scss"
import PlayerList from "../../components/PlayerList/PlayerList"
import {ClipLoader} from "react-spinners"

const GameDetail = () => {
  const [userId, setUserId] = useState()
  const [gameDetail, setGameDetail] = useState()
  // grab search parameter, convert to an obj
  const location = useLocation()
  const {gameId} = qs.parse(location.search)

  
  useEffect(() => {
    async function getGame(){
      try {
        const user = JSON.parse(localStorage.getItem("user"))
        setUserId(user.id)
        const response = await axios.get(`http://localhost:5432/game/${gameId}`)
        setGameDetail(response.data)
      } catch {
        console.error()
      }
    }
    getGame()
  }, [])

const joinGame = async () => {
  if(isLoggedIn){
    try {
      await axios.put(`http://localhost:5432/joinGame/${gameId}/?userId=${userId}`)
    }
    catch {
      console.error()
    }
  } 
  else {

  }
}
  return (
    <div className='detail-wrapper'>
    <div className='detailCon'>
      {gameDetail ? 
     <div className="detailCard">
          <h1 className="detailLocation">{gameDetail.venue}</h1>
        <div className="detailContent-con">
          <div className='detail-con'>
           <span className="detailTitle">Skill Level</span>
           <span className='detail'>{gameDetail.skill}</span>
          </div>
          <div className='detail-con'>
           <span className="detailTitle">Duration</span>
           <span className='detail'>{gameDetail.duration}Min</span>
          </div>
          <div className='detail-con'>
           <span className="detailTitle">Age Group</span>
           <span className='detail'>{gameDetail.agegroup}</span>
          </div>
          <div className='detail-con'>
           <span className="detailTitle">Players</span>
           <span className='detail'>5</span>
          </div>
       </div>
    </div> 
    :  <ClipLoader /> }
        <ul className="prof-actions">    
          <li onClick={() => joinGame()} className="join-action">Join Game</li>
          <li className="leave-action">Leave Game</li>
      </ul>
    </div>
        <PlayerList gameId={gameId} userId={userId} />
    </div>
  )
}

export default GameDetail