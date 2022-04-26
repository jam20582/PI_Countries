import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../actions/actions";
import {Activity} from "../components/Activity";
import style from '../Styles/CountryDetail.module.css';


export const CountryDetail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  console.log(countryDetail.activities);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetail(id));
  },[dispatch , id]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.containerDouble}>
          <button className={style.backButton}>
            <Link className={style.link} to="/home" >Back to countries</Link>
          </button>
            {countryDetail.activities?.length > 0 ? 
          <button className={style.backButton}>
          <Link className={style.link} to="/activity">
            <h3>Create another activity</h3></Link>
          </button> : 
          <button className={style.backButton}>
              <Link className={style.link} to="/activity">
                <h3>No activities for this country... Lets create one</h3></Link>
          </button>}
        </div>
      </div>  
      <div className={style.container}>
        <div className={style.containerDouble}>
            <div>
              <img style={{borderRadius: '50px'}} src={countryDetail.flag} alt="No img" />
            </div>
            <div>
              <h2>{countryDetail.name}</h2>
              <table class={style.table}> 
                <tbody>
                  <tr>
                    <td className={style.columntitle}>Country Code:</td>
                    <td className={style.columninfo}>{countryDetail.id}</td>
                  </tr>
                  <tr>
                    <td>Continent:</td>
                    <td>{countryDetail.region}</td>
                  </tr>
                  <tr>
                    <td>Subregion:</td>
                    <td>{countryDetail.subregion}</td>
                  </tr>
                  <tr>
                    <td>Capital:</td>
                    <td>{countryDetail.capital}</td>
                  </tr>
                  <tr>
                    <td>Area:</td>
                    <td>{countryDetail.area} Km2</td>
                  </tr>
                  <tr>
                    <td>Population:</td>
                    <td>{countryDetail.population} Hab.</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>    
        <div className={style.container} >
          <Activity countryName={countryDetail.name} activities={countryDetail.activities}/>
        </div>
    </div>
  );
};
