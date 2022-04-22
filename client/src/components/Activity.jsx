import React from "react";
import { Link } from "react-router-dom";
//import style from "./activdetail.module.css"


export const Activity = ({ activities, countryName }) => {
  if (activities && activities.length > 0) {
    console.log(activities);
    return (
      <div className='grid'>
        <h3>Activities planed in {countryName}</h3>
        <table className="greyGridTable">
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
    return <Link className='' to="/activity"><h3>Plan activities for this country!</h3></Link>
  }
};


