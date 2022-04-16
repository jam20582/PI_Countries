import {getAllCountries} from '../actions/actions';
import {useDispatch , useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Country} from '../components/Country'
//import './Countries.css'

export function Countries(){
    const dispatch = useDispatch();
    
    const countries = useSelector((state) => state.allCountries);
    
    useEffect( () => {
    dispatch(getAllCountries());
    },);
    return (
        <div className="countries">
            {countries ?  countries.map(country => 
                (   
                    <Link to={`/countries/${country.id}`} key={country.id}>
                        <Country
                            img={country.flag}
                            name={country.name}
                            region={country.region}
                        />
                    </Link>
                )
            ) : null }
            
        </div>
    )
}

//<Link to={`/countries/${country.id}`} key={country.id}>img={country.flag}</Link>


//  <div key={country.id} className="country">
//                         <img className="countryImg" src={country.flag} alt={`bandera de ${country.name}`} />
//                         <div className="countryDatos">
//                             <Link to={`/countries/${country.id}`}><p className="nombre">{country.name}</p></Link>
//                             <h3>{country.region}</h3>
//                         </div>
//                     </div> 

//                      <>
//             {countries ? countries.map((country) => (
//                 <h3 key={country.id}>{country.name}</h3>
//             )) : <h1>Cargando...</h1>}
//             </>