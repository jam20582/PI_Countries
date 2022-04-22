import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../actions/actions";
import {Activity} from "../components/Activity";


export const CountryDetail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetail(id));
  },[]);

  return (
    <div>
      <button className='back-button'>
        <Link className="App-link" to="/home" >Back to countries</Link>
      </button>
      <div className="container-80">
        <div className='container-double'>
            <div>
              <img src={countryDetail.flag} alt="No img" />
            </div>
            <div>
              <h2>{countryDetail.name}</h2>
              <h3>Country Code: {countryDetail.id}</h3>
              <h4>Continent: {countryDetail.region}</h4>
              <h5>Subregion: {countryDetail.subregion}</h5>
              <h5>Capital: {countryDetail.capital}</h5>
              <h5>Area: {countryDetail.area} Km2</h5>
              <h5>Population: {countryDetail.population} Hab. </h5>
            </div>
        </div>
        <div >
          <Activity countryName={countryDetail.name} activities={countryDetail.activities}/>
        </div>
      </div>    
    </div>
  );
};
