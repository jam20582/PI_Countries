import React from 'react'
import mapa from '../img/mapa.png'
import {Link} from 'react-router-dom';


export function LandingPage() {
  
  return (
    <div className="landing">
      <button className="light-button">    
          <Link to='/home'><img src={mapa} alt='Click para ingresar' /></Link>
      </button>
    </div>
  )
}
