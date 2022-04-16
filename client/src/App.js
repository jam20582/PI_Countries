import './App.css';
import {Routes , Route} from 'react-router-dom'
//import {getCountryDetail, getCountryName} from './actions/actions.js';
//import { useDispatch , useSelector} from 'react-redux';
//import {useEffect} from 'react';
import {Countries} from './components/Countries.jsx'
import {CountryDetail} from './components/CountryDetail.jsx'
import {LandingPage} from './components/LandingPage.jsx'



function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Countries />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

// function App() {
//   const dispatch = useDispatch();
//   useEffect( () => {
//     dispatch(getCountryDetail('arg'));
//   },[]);
//   const countries = useSelector((state) => state.countryDetail);
//   return (
//     <div className="App">
//       <h1>Henry Countries</h1>
//       <h1>{countries.name}</h1>
//       {countries?.activities?.length > 0 ? <h2>{countries.activities[0].name}</h2> : <h2>'Pais sin actividades'</h2>}
//     </div>
//   );
// }


// function App() {
//   const dispatch = useDispatch();
//   useEffect( () => {
//     dispatch(getCountryName('ita'));
//   },[]);
//   const countries = useSelector((state) => state.searchCountry);
//   //console.log(countries ? countries[0].name);
//   return (
//     <div className="App">
//       <h1>Henry Countries</h1>
//       {countries ? countries.map((country) => (
//       <h1 key={country.id}>{country.name}</h1>
//       )) : <h1>Cargando...</h1>}
//     </div>
//   );
// }
export default App;


