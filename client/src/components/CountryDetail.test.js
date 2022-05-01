// import {render} from '@testing-library/react';
// import {CountryDetail} from './CountryDetail';
// import {Provider, useDispatch, useSelector} from 'react-redux';
// import {BrowserRouter, useParams} from 'react-router-dom';
//import { getCountryDetail, clearDetail } from "../actions/actions";

// import configureStore from 'redux-mock-store';

// describe('Country detail component test', () => {
//     const initialState = {};
//     const mockStore = configureStore();
//     let store;
//     let detail;

//     beforeEach(() => {
//         store = mockStore(initialState);
        
//         detail = (
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <CountryDetail />
//                 </BrowserRouter>
//             </Provider>
//         );
//     });

//     it('Should render a ...', () => {
//         const {getByText} = render(detail);
//         getByText.debug()
//         //console.log(getByText)
//         //expect(getByText('Order Alphabetically')).not.toBeNull();
//     });

//     // it('should have a search input', () => {
//     //     const {getByText} = render(header);
//     //     expect(getByText('Search for countries')).not.toBeNull();
//     // })
// });