import { GET_ALL_COUNTRIES, GET_COUNTRY_ID, GET_COUNTRY_NAME , POST_ACTIVITY} from "../actions/actions";

const initialState ={
    allCountries: [],
    countryDetail:{},
    searchCountry:[]
}

function reducer(state=initialState, {type, payload}){
    switch(type){

        case GET_ALL_COUNTRIES:{
            return {
            ...state,
            allCountries: payload
        }
    }

        case GET_COUNTRY_ID:{
            return {
                ...state,
                countryDetail: payload
            }
        }

        case GET_COUNTRY_NAME:{
            return {
                ...state,
                searchCountry: payload
            }
        }

        case POST_ACTIVITY:{
            return {
                ...state,
                countryDetail: payload
            }
        }
        default:  return state
        
    }
}

export default reducer;