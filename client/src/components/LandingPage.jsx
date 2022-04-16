import React from 'react'
import mapa from '../img/mapa.png'
import {Link} from 'react-router-dom';

export function LandingPage() {

  return (
    <div>
        
        <Link to='/home'><img src={mapa} alt='imagen'/></Link>
    </div>
  )
}
