import React, {useState, useEffect} from 'react';
import {postActivity} from '../actions/actions';
import { useSelector, useDispatch} from 'react-redux';
import {getAllCountries} from '../actions/actions';
import {Link} from 'react-router-dom';
import {utils} from '../Utils/Utils';
import style from '../Styles/ActForm.module.css';


export function ActForm(props) {

    const arrDuration = [];

    for (let i = 1; i <= 24; i++) {
        arrDuration.push(i);
    }

    const initialInput = {
    name:'',
    duration:'',
    difficulty:'',
    season: '',
    countryID: []
    }

    const allCountries = useSelector((state) => state.allCountries);
    //console.log(countries)

    const dispatch = useDispatch();

    const [input, setInput] = useState(initialInput);
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        let item = e.target.name
        if(item === 'name'){
            setErrors(utils.validate({...input, [item]: e.target.value}, item))
            setInput({...input, [item]: e.target.value}) 
        }

        let exist = input.countryID.find((c) => c === e.target.value);
        if(!exist){
            if(e.target.name === 'countryID') {
                setInput({...input, [e.target.name]: [...input.countryID, e.target.value]});
            } else {
                setInput({...input, [e.target.name]: e.target.value});
            }    
        }

        if(e.target.name === 'duration'){
            let stringToTime = e.target.value;
            if(parseInt(e.target.value) < 10) {
                stringToTime = `0${stringToTime}:00`
            } else {
                stringToTime += ':00'
            }
            setInput({...input, [e.target.name]: stringToTime})
        }
    };

    const delCountry = (e) => {
        let country = input.countryID.filter((c) => c !== e.target.value);
        setInput({
            ...input,
            countryID: country
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(utils.isObjEmpty(errors)){
            setInput(initialInput)
            setErrors({})
            alert('Create fail: incorrect data types')
        } else {
            dispatch(postActivity(input));
            setInput(initialInput)
            setErrors({})
            alert('Activity Created Succesfully')
        }
    }

    useEffect(() => {
        dispatch(getAllCountries())
    },[dispatch]);

    return (
        <div className={style.container}>
            <button className={style.backButton} style={{marginBottom: '30px'}}>
                <Link className={style.link} to="/home" >Back to countries</Link>
            </button>
        <form onSubmit={handleOnSubmit}>
            <div>
                {errors.name && <h3>{errors.name}</h3>}
            <input className={style.searchInput} name="name" placeholder="Activity name to create" value={input.name} onChange={handleOnChange}></input>
            </div>
                <div className={style.containerDouble}>
                    <div>
                        <select name='difficulty' className={style.selectBox} onChange={handleOnChange} required >
                            <option value={input.difficulty}>Difficulty Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <select name='duration' className={style.selectBox} onChange={handleOnChange} required>
                            <option value={input.duration}>Duration Select</option>
                            {arrDuration.map(duration => (
                                    <option key={duration} value={duration}>{`${duration}:00 Hours`}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <select name='season' className={style.selectBox} onChange={handleOnChange} required>
                            <option value={input.season}>Season Select</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                    <div className={style.containerDouble}>
                        <div>
                            <h3>Select the countries to add the activity to</h3>
                            <select name='countryID' className={style.selectBox} onChange={handleOnChange} required>
                                <option value={input.countryID}>Countries Select</option>
                                {allCountries?.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <h3>Countries to add the activity</h3>
                            <table className={style.table}>
                            <thead>
                                <tr>
                                <th>Country code</th>
                                <th>To Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input.countryID &&
                                input.countryID.map((c) => (
                                    <tr key={c}>
                                    <td>{c}</td>
                                    <td><button onClick={delCountry} value={c}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'50px'}}>   
            <button className={style.lightButton} type="submit" disabled={utils.isObjEmpty(errors)}>Add</button>
            </div>
        </form>
        </div>
    )
};
