import React from 'react';
import style from '../Styles/Pagination.module.css';

export const Pagination = ({ countriesPerPage, totalCountries, paginate }) => {
    const pageNumbers = [];

    const secPageToFinish = totalCountries - 9;
    pageNumbers.push(1);
    
    for (let i = 2; i <= Math.ceil(secPageToFinish / 10); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.footer}>
            {pageNumbers.map(number => (
                <li key={number} style={{listStyle: 'none'}}>
                    <button className={style.paginationButton} onClick={() => paginate(number)}>{number}</button>
                </li>
            ))}
            </ul>
        </nav>
    );
};
