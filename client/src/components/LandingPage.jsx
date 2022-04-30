import React from 'react'
import style from '../Styles/LandingPage.module.css'
import {Link} from 'react-router-dom';


export function LandingPage() {
  
  return (
    <div className={style.landing}>
          <Link className={style.link} to='/home'>
            <button className={style.lightbutton}>&gt;&gt;CLICK TO BEGIN&lt;&lt;</button>
          </Link>
    </div>
  )
}
