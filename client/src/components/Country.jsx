import React from 'react'
import './Country.css'

export function Country(props) {
  return (
    <div>
        <div className="countryCard">
            <img src={props.img} alt='imagen' className="countryImg"/>
            <div className="info">
                <p className="countryName"> <strong>Name: {props.name}</strong></p>
                <p className="countryRegion">Continent: {props.region}</p>
            </div>
        </div>
    </div>
  )
}
