import React from 'react'
import style from '../Styles/Country.module.css'
import {Link} from 'react-router-dom';


export function Country(props) {
  const {index, id, flag, name, region} = props;
  return (
    <Link className={style.AppLink} to={`/countries/${id}`}>
      <div className={style.card} title={index}>
        <div className={style.imageContainer}>
            <img src={flag} alt={name +" flag"} className={style.image}/>
        </div>
          <div className={style.details}>
              <div className={style.title}>
                  <h2>{name}</h2>
          </div>
          <p>{`Continent: ${region}`}</p>
        </div>
      </div>
    </Link>
  )
}
