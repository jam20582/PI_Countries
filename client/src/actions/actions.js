import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const GET_COUNTRY_ID = 'GET_COUNTRY_ID';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const REGION_FILTER = 'REGION_FILTER';
export const ACTIVITY_FILTER = 'ACTIVITY_FILTER';
export const SORT_ORDER_NAME_ASC = 'SORT_ORDER_NAME_ASC';
export const SORT_ORDER_NAME_DES = 'SORT_ORDER_NAME_DES';
export const SORT_ORDER_POP_ASC = 'SORT_ORDER_POP_ASC';
export const SORT_ORDER_POP_DES = 'SORT_ORDER_POP_DES';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';


const URL_POST = 'http://localhost:3001/activity'
const URL = 'http://localhost:3001/countries'
const URL_ACT = 'http://localhost:3001/activities'

export const getAllCountries = () => async dispatch => {
    try {
        const response = await axios(URL);
        return dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    } catch (error) {
        return console.log('ERROR--->', error);
    }
}

export const getAllActivities = () => async dispatch => {
    try {
        const response = await axios(URL_ACT);
        return dispatch({ type: GET_ALL_ACTIVITIES, payload: response.data });
    } catch (error) {
        return console.log('ERROR--->', error);
    }
}

export const getCountryDetail = (id) => async dispatch => {
    try {
        const response = await axios(`${URL}/${id}`);
        return dispatch({ type: GET_COUNTRY_ID, payload: response.data });
    } catch (error) {
        return console.log('ERROR--->', error);
    }
}

export const getCountryName = (name) => async dispatch => {
    try {
        const response = await axios(`${URL}?name=${name}`);
        //console.log(response)
        if(response.data) return dispatch({ type: GET_COUNTRY_NAME, payload: response.data });
        
            
    } catch (error) {
        return dispatch({ type: GET_COUNTRY_NAME, payload: {error:'no se encontro datos'} });
    }
}

export const postActivity = (formInfo) => async dispatch=> {
    try {
        await axios.post(URL_POST, formInfo);
        return dispatch({ type: POST_ACTIVITY });
    } catch (error) {
        return console.log(error);
    }
}

export const orderNameAsc = () => {
    return {
        type: SORT_ORDER_NAME_ASC,
    }
}

export const orderNameDes = () => {
    return {
        type: SORT_ORDER_NAME_DES,
    }
}

export const orderPopAsc = () => {
    return {
        type: SORT_ORDER_POP_ASC,
    }
}

export const orderPopDes = () => {
    return {
        type: SORT_ORDER_POP_DES,
    }
}

export const regionFilter = (region) => {
    return {
        type: REGION_FILTER, payload: region
    }
}

export const activityFilter = (activity) => {
    //console.log(activity)
    return {
        type: ACTIVITY_FILTER, payload: activity
    }
}

export function clearDetail(){
    return {type: CLEAR_DETAIL}
} 