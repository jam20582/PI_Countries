import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCountryDetail, clearDetail } from '../actions/actions';
import {Activity} from '../components/Activity';
import style from '../Styles/CountryDetail.module.css';


export const CountryDetail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  
  const dispatch = useDispatch();

  let { id } = useParams();
  
  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  },[dispatch , id]);
  
  return (
    <div>
      <div className={style.container}>
        <div className={style.containerDouble}>
        <Link className={style.link} to='/home' >
          <button className={style.backButton}>Back to countries</button>
        </Link>
          
            {countryDetail.activities?.length > 0 ? 
          <Link className={style.link} to='/Activity' >
            <button className={style.backButton}>Create another activity</button>
          </Link> : 
          <Link className={style.link} to='/Activity' >
          <button className={style.backButton}>No activities for this country... Lets create one</button>
        </Link>}
        </div>
      </div>  
      <div className={style.container}>
        <div className={style.containerDouble}>
            <div>
              <img style={{borderRadius: '50px'}} src={countryDetail.flag} alt='No img' />
            </div>
            <div>
              <h2>{countryDetail.name}</h2>
              <table className={style.table}> 
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
                    <td>{countryDetail.area?.toLocaleString('en-US')} Km2</td>
                  </tr>
                  <tr>
                    <td>Population:</td>
                    <td>{countryDetail.population?.toLocaleString('en-US')} Hab.</td>
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
