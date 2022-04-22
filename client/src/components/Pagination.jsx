import React from 'react';

export const Pagination = ({ countriesPerPage, totalCountries, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='footer'>
            {pageNumbers.map(number => (
                <li key={number} style={{listStyle: 'none'}}>
                    <button className='pagination-button' onClick={() => paginate(number)}>{number}</button>
                </li>
            ))}
            </ul>
        </nav>
    );
};
