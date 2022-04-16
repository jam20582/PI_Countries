import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
// export const SEARCH_COUNTRY_ID = "SEARCH_COUNTRY_ID"
export const POST_ACTIVITY = "POST_ACTIVITY"

const URL = "http://localhost:3001/countries"

export function getAllCountries(){
    return async function (dispatch){
        try {
            const r = await fetch(URL);
            const res = await r.json();
            return dispatch({ type: GET_ALL_COUNTRIES, payload: res });
        } catch (error) {
            return console.log("ERROR--->", error);
        }
    }
}

export const getCountryDetail = (id) => async dispatch => {
    try {
        const response = await axios(`${URL}/${id}`);
        console.log(response.data)
        return dispatch({ type: GET_COUNTRY_ID, payload: response.data });
    } catch (error) {
        return console.log("ERROR--->", error);
    }

}

export const getCountryName = (name) => async dispatch => {
    console.log(name)
    try {
        const response = await axios(`${URL}?name=${name}`);
        console.log(response.data)
        return dispatch({ type: GET_COUNTRY_NAME, payload: response.data });
    } catch (error) {
        return console.log("ERROR--->", error);
    }

}

// export function searchbar(name){
    //     return function (dispatch){
        //         return fetch(URL+ "/?name=" + name)
        //         .then(r=>r.json())
        //         .then(res=> dispatch({type: SEARCH_CHARACTER, payload: res.results }))
        //         .catch(error=> console.log("ERROR--->",error))
        //     } 
        //}


        // export function clearDetail(){
        //     return {type: CLEAR_DETAIL}
        // } 