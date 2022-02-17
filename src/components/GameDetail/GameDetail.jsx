import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import qs from "query-string"
import "./GameDetail.scss"

const GameDetail = () => {
  const [gameDetail, setGameDetail] = useState()
  // grab search parameter, convert to an obj
  const location = useLocation()
  const {id} = qs.parse(location.search)
  
  useEffect(() => {
    // console.log(id);
    async function getGame(){
      try {
        const response = await axios.get(`http://localhost:5432/game/${id}`)
        setGameDetail(response.data)
      } catch {
        console.error()
      }
    }
    getGame()
  }, [])


  return (
    <div className='detailCon'>
     <div className="detailCard">
          <h1 className="detailLocation">Location: {gameDetail.venue}</h1>
        <div className="detailContent">
           <span className="detailCity">{gameDetail.city}, UT</span>
           <span className="detailCity">{gameDetail.city}, UT</span>
           <span className="detailCity">{gameDetail.city}, UT</span>
           <span className="detailCity">{gameDetail.city}, UT</span>
           <span className="detailCity">{gameDetail.city}, UT</span>
       </div>
    </div>
    </div>
  )
}

export default GameDetail