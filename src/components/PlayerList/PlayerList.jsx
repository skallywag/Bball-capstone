import React from 'react'
import "./PlayerList.scss"

const PlayerList = () => {
  return (
    <div className='players-con'>
      <h1>Players</h1>
          <div className='playerCard'>
            <div className='prof-bubble'/>
            <h1>Name</h1>
          </div>
          {/* <div className='playerCard'>
            <div className='prof-bubble'/>
            <h1>Name</h1>
          </div>
          <div className='playerCard'>
            <div className='prof-bubble'/>
            <h1>Name</h1>
          </div> */}
      </div>
  )
}
export default PlayerList