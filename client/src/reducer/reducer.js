import { GET_ALL_COUNTRIES,
        GET_ALL_ACTIVITIES, 
        GET_COUNTRY_ID, GET_COUNTRY_NAME,
        POST_ACTIVITY,
        REGION_FILTER,
        ACTIVITY_FILTER,
        CLEAR_DETAIL,
        SORT_ORDER_NAME_ASC,
        SORT_ORDER_NAME_DES,
        SORT_ORDER_POP_ASC,
        SORT_ORDER_POP_DES,
        CLEAR_FILTER} from '../actions/actions';

const initialState ={
    allCountries: [],
    countryDetail: {},
    allActivities: [],
    message: null
}

const order = (arr , prop) => {
    const result = arr.sort(function(a, b) {
        if(a[prop] < b[prop]) return -1;
        if(a[prop] > b[prop]) return 1;
        return 0;
    });
    return result;
}

function reducer(state=initialState, {type, payload}){
    switch(type){

        case GET_ALL_COUNTRIES:{
            return {
            ...state,
            allCountries: payload
        }
    }

    case GET_ALL_ACTIVITIES:{
        return {
        ...state,
        allActivities: payload
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
                message: payload
            }
        }

        case REGION_FILTER:{
            let allCountriesClone = [...state.allCountries];
            let filtered = allCountriesClone.filter(c => c.region?.includes(payload))
            return{
                ...state,
                searchCountry: filtered
            }
        }

        case ACTIVITY_FILTER:{
            let allCountriesClone = [...state.allCountries];
            let filtered = allCountriesClone.filter(c => c.activities?.filter(a => a.name === payload ).length >0)
            return{
                ...state,
                searchCountry: filtered
            }
        }

        case CLEAR_FILTER:{
            delete state.searchCountry
            return {
                ...state,
            }
        }

        case CLEAR_DETAIL:{
            return{
                ...state,
                countryDetail:{},
                message: null
            }
        }

        case SORT_ORDER_NAME_ASC:{
            let asc = state.searchCountry ? order(state.searchCountry, 'name') : order(state.allCountries, 'name')
            return {
                ...state,
                searchCountry: asc
            }
        }

        case SORT_ORDER_NAME_DES:{
            let des = state.searchCountry ? order(state.searchCountry, 'name').reverse() : order(state.allCountries, 'name').reverse();
            return {
                ...state,
                searchCountry: des
            }
        }

        case SORT_ORDER_POP_ASC:{
            let asc = state.searchCountry ? order(state.searchCountry, 'population') : order(state.allCountries, 'population')
            return {
                ...state,
                searchCountry: asc
            }
        }

        case SORT_ORDER_POP_DES:{
            let des = state.searchCountry ? order(state.searchCountry, 'population').reverse() : order(state.allCountries, 'population').reverse();
            return {
                ...state,
                searchCountry: des
            }
        }

        default:  return state
        
    }
}

export default reducer;