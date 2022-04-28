import React from 'react'
import style from '../Styles/LandingPage.module.css'
import mapa from '../img/mapa.png'
import {Link} from 'react-router-dom';


export function LandingPage() {
  
  return (
    <div className={style.landing}>
          <Link to='/home'><img src={mapa} alt='Click para ingresar' style={{marginTop: '50px'}}/></Link>
    </div>
  )
}
