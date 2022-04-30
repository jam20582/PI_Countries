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
    name: '',
    duration:'',
    difficulty:'',
    season: '',
    countryID: []
    }

    const allCountries = useSelector((state) => state.allCountries);
    const message = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const [input, setInput] = useState(initialInput);
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        if(e.target.name === 'name'){
            setErrors(utils.validate({...input,[e.target.name]: e.target.value}))
            setInput({...input, [e.target.name]: e.target.value}) 
        }
        if(e.target.name === 'countryID') {
        let exist = input.countryID.find((c) => c === e.target.value);
        if(!exist){
                setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
                setInput({...input, [e.target.name]: [...input.countryID, e.target.value]});
            }   
        }
        if(e.target.name === 'difficulty'){
            setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
            setInput({...input, [e.target.name]: e.target.value}) 
        }
        if(e.target.name === 'duration'){
            setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
            let stringToTime = e.target.value;
            if(parseInt(e.target.value) < 10) {
                stringToTime = `0${stringToTime}:00`
            } else {
                stringToTime += ':00'
            }
            setInput({...input, [e.target.name]: stringToTime})
        }
        if(e.target.name === 'difficulty'){
            setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
            setInput({...input, [e.target.name]: e.target.value}) 
        }
        if(e.target.name === 'season'){
            setErrors(utils.validate({...input, [e.target.name]: e.target.value}))
            setInput({...input, [e.target.name]: e.target.value}) 
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
            dispatch(postActivity(input));
            setInput(initialInput)
            setErrors({})
            alert('Activity Created Succesfully')
        }

    useEffect(() => {
        dispatch(getAllCountries())
    },[dispatch, errors]);

    return (
        <div className={style.container}>
            <button className={style.backButton} style={{marginBottom: '30px'}}>
                <Link className={style.link} to="/home" >Back to countries</Link>
            </button>
        <form onSubmit={handleOnSubmit}>
            <div>
                {errors.name && <h3>{errors.name}</h3>}
            <input className={style.searchInput} name="name" placeholder="Activity name to create" value={input.name} onChange={handleOnChange} required></input>
            </div>
                <div className={style.containerDouble}>
                    <div>
                        <select name='difficulty' className={style.selectBox} onChange={handleOnChange} required >
                            <option value=''>Difficulty Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <select name='duration' className={style.selectBox} onChange={handleOnChange} required>
                            <option value=''>Duration Select</option>
                            {arrDuration.map(duration => (
                                    <option key={duration} value={duration}>{`${duration}:00 Hours`}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <select name='season' className={style.selectBox} onChange={handleOnChange} required>
                            <option value=''>Season Select</option>
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
                                <option value=''>Countries Select</option>
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
            {utils.isObjEmpty(errors) ? <h3>Button disabled until no errors in data</h3> : 
            <button className={style.lightButton} type="submit">Add</button>}
            </div>
        </form>
        </div>
    )
};
