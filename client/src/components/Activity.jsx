import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Styles/Activity.module.css';


export const Activity = ({ activities, countryName }) => {

  if (activities && activities.length > 0) {

    return (
      <div>
        <h3>Activities planed in {countryName}</h3>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration (hours)</th>
              <th>Season</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {activities &&
              activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.duration}</td>
                  <td>{a.season}</td>
                  <td>{a.difficulty}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className={style.container}>
        <button className={style.backButton}>
          <Link className={style.link} to="/activity"><h3>No activities... Lets create some!!</h3></Link>
        </button>
      </div>
    )
  }
};


