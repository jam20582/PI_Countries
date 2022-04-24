import React from 'react'
import style from '../Styles/LandingPage.module.css'
import mapa from '../img/mapa.png'
import {Link} from 'react-router-dom';


export function LandingPage() {
  
  return (
    <div className={style.landing}>
      <button className={style.landingbutton}>    
          <Link to='/home'><img src={mapa} alt='Click para ingresar' /></Link>
      </button>
    </div>
  )
}
