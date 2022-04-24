import {getAllCountries} from '../actions/actions';
import {useDispatch , useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Country} from '../components/Country';
import {Pagination} from '../components/Pagination';
import style from '../Styles/Countries.module.css';

export function Countries(){
    const dispatch = useDispatch();
    
    const countries = useSelector((state) => state);
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const [countriesPerPage, setCountriesPerPage] = useState(10);

    const pageValidator = (currentPage) => {
        if(currentPage === 1){
            setCountriesPerPage(9);
            return;
        }
        setCountriesPerPage(10);
    }

    useEffect( () => {
    dispatch(getAllCountries());
    },[dispatch]);

    
    //const pagina = pageValidator(currentPage)
    // Get current country
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountry = Array.isArray(countries.searchCountry) ? countries.searchCountry?.slice(indexOfFirstCountry, indexOfLastCountry) : countries.allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    };

    useEffect( () => {
        pageValidator(currentPage)
    },[currentPage])

    return (
        <div className={style.container}>
            <div className={style.containerGrid}>
                
                {!countries.searchCountry ?  !countries.allCountries ? <h1>Cargando...</h1>
                
                : currentCountry?.map(country => (   
                    <Country key={country.id}
                        id={country.id}
                        flag={country.flag}
                        name={country.name}
                        region={country.region}
                    />))

                : !Array.isArray(countries.searchCountry) ? <h1>No se encontraron paises</h1>

                : currentCountry?.map(country => (   
                    <Country key={country.id}
                        id={country.id}
                        flag={country.flag}
                        name={country.name}
                        region={country.region}
                    />)) }    
            </div>
            <div>
                <Pagination
                    countriesPerPage={countriesPerPage}
                    totalCountries={countries.searchCountry ? countries.searchCountry.length : countries.allCountries.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}
