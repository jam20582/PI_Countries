import React, {useState, useEffect}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {orderNameAsc, orderNameDes, activityFilter, getAllActivities, getCountryName, regionFilter, clearDetail,orderPopAsc, orderPopDes} from '../actions/actions'

export function Header() {
    const dispatch = useDispatch();

    const activities = useSelector((state) => state.allActivities);

    const [orderN, setOrderN] = useState({
        type: 'Ascendente'
    });

    const [orderP, setOrderP] = useState({
        type: 'Ascendente'
    });

    const [name, setName] = useState('')

    const orderName = () => {
        if(orderN.type === 'Ascendente'){
            dispatch(orderNameAsc())
            setOrderN({type: 'Descendente'});
        }
        if(orderN.type === 'Descendente'){
            dispatch(orderNameDes())
            setOrderN({type: 'Ascendente'});
        }
    };

    const orderPop = () => {
        if(orderP.type === 'Ascendente'){
            dispatch(orderPopAsc())
            setOrderP({type: 'Descendente'});
        }
        if(orderP.type === 'Descendente'){
            dispatch(orderPopDes())
            setOrderP({type: 'Ascendente'});
        }
    };

    const handleChange = (e) =>{
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountryName(name))
        setName('')
    }

    const filter = (e) => {
        if(e.target.value === '') return dispatch(clearDetail());
        dispatch(regionFilter(e.target.value))
    }

    const filterAct = (e) => {
        if(e.target.value === '') return dispatch(clearDetail());
        dispatch(activityFilter(e.target.value))
    }

    const clear = () => {
        dispatch(clearDetail())
    }

    useEffect( () => {
        dispatch(getAllActivities());
        },[]);

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <button className="light-button" onClick={clear}>
                            <h2>Henry Countries</h2>
                            <h3>App Reset</h3>
                        </button>
                    </Link>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <input className='search' type="text" placeholder="Buscador" value={name} onChange={handleChange}></input>
                    </form>
                </div>
                <div className='select'>
                    <select  className='select-box' onChange={filter} >
                        <option value=''>Filtrar por Continente</option>
                        <option value="Americas">Americas</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctic">Antarctic</option>
                    </select>
                </div>
                <div className='select'>
                    <select  className='select-box' onChange={filterAct} >
                        <option value=''>Filtrar por Actividad</option>
                        {activities?.map(act => (
                            <option key={act.id} value={act.name}>{act.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className='light-button' onClick={orderName}><h3>Ordenar Alfabeticamente</h3><h3>{orderN.type}</h3></button>
                    <button className='light-button' onClick={orderPop}><h3>Ordenar por Poblacion</h3><h3>{orderP.type}</h3></button>
                </div>
            </nav>
        </header>
        )
}
