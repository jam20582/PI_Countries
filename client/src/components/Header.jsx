import React, {useState, useEffect}from 'react';
import style from '../Styles/Header.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {orderNameAsc, 
        orderNameDes, 
        activityFilter, 
        getAllActivities, 
        getCountryName, 
        regionFilter, 
        clearDetail,
        orderPopAsc, 
        orderPopDes} from '../actions/actions'

export function Header() {
    const dispatch = useDispatch();

    const activities = useSelector((state) => state.allActivities);

    const [orderN, setOrderN] = useState({
        type: 'A to Z'
    });

    const [orderP, setOrderP] = useState({
        type: 'Lower'
    });

    const [name, setName] = useState('')

    const orderName = () => {
        if(orderN.type === 'A to Z'){
            dispatch(orderNameAsc())
            setOrderN({type: 'Z to A'});
        }
        if(orderN.type === 'Z to A'){
            dispatch(orderNameDes())
            setOrderN({type: 'A to Z'});
        }
    };

    const orderPop = () => {
        if(orderP.type === 'Lower'){
            dispatch(orderPopAsc())
            setOrderP({type: 'Highest'});
        }
        if(orderP.type === 'Highest'){
            dispatch(orderPopDes())
            setOrderP({type: 'Lower'});
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

    useEffect( () => {
        dispatch(getAllActivities());
        },[dispatch]);

    return (
        <header className={style.navbar}>
                <div className={style.resetButton}>
                    <Link to='/'>
                        <button className={style.lightButton} onClick={() => dispatch(clearDetail())}>
                            <h2>Henry Countries</h2>
                            <h3>App Reset</h3>
                        </button>
                    </Link>
                </div>
                <form onSubmit={onSubmit} className={style.input}>
                    <input className={style.searchInput} type='text' placeholder='Search for countries...' value={name} onChange={handleChange}></input>
                </form>
                <div>
                    <select  className={style.selectbox} onChange={filter} >
                        <option value=''>Filter by Continent</option>
                        <option value='Americas'>Americas</option>
                        <option value='Europe'>Europe</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Antarctic'>Antarctic</option>
                    </select>
                    <select  className={style.selectbox} onChange={filterAct} >
                        <option value=''>Filter by Activity</option>
                        {activities?.map(act => (
                            <option key={act.id} value={act.name}>{act.name}</option>
                        ))}
                    </select>
                    <button className={style.orderButton} onClick={orderName}><h3>Order Alphabetically</h3><h3>{orderN.type}</h3></button>
                    <button className={style.orderButton} onClick={orderPop}><h3>Sort by Population</h3><h3>{orderP.type}</h3></button>
                </div>
        </header>
        )
}
