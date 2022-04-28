import {getAllCountries} from '../actions/actions';
import {useDispatch , useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Country} from '../components/Country';
import {Pagination} from '../components/Pagination';
import { Link } from 'react-router-dom';
import { clearDetail } from '../actions/actions'
import mundo from '../img/Mundo_hecho_de_Banderas.gif'
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
    const currentCountry = Array.isArray(countries.searchCountry) 
        ? countries.searchCountry?.slice(indexOfFirstCountry, indexOfLastCountry) 
        : countries.allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    };

    const renderContext = {
        allCountries: 
            !countries.allCountries ? <h1>Cargando...</h1>
                : currentCountry?.map(country => (   
                    <Country key={country.id}
                        id={country.id}
                        flag={country.flag}
                        name={country.name}
                        region={country.region}
                    />))
        ,

        searchCountry: 
            !Array.isArray(countries.searchCountry) 
                ? <><h1>No countries found...</h1>
                    <img src={mundo} alt='gif mundo'/>
                    <div>
                    <button className={style.backButton} onClick={() => dispatch(clearDetail())}>Back to countries</button>
                    </div>
                    </>  
                : currentCountry?.map(country => (   
                    <Country key={country.id}
                        id={country.id}
                        flag={country.flag}
                        name={country.name}
                        region={country.region}
                    />))     
    }
    

    useEffect( () => {
        pageValidator(currentPage)
    },[currentPage])

    return (
        <div className={style.container}>
            <div className={style.containerGrid}>
                {!countries.searchCountry ?  renderContext.allCountries : renderContext.searchCountry}    
            </div>
            <div>
                <Pagination
                    countriesPerPage={countriesPerPage}
                    totalCountries={countries.searchCountry ? countries.searchCountry.length : countries.allCountries.length}
                    paginate={paginate}
                />
            </div>
            <div className={style.containerDouble}>
                {countries.searchCountry ? 
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                        <button className={style.lightButton} onClick={() => dispatch(clearDetail())}>Back to all countries</button>
                </div>
                : null}
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                    <Link className={style.link} to='/About' >
                        <button className={style.lightButton}>About author</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
