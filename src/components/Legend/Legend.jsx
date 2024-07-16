import React from 'react';
import './Legend.scss';

const Legend = ({ filters, setFilters }) => {
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };

    return (
        <div className="legend">
            <h2 className='legend__title'>Item Status</h2>
            <div className='legend__content'>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="borrowedSoon" checked={filters.borrowedSoon} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--soon"></span> Due soon
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="borrowedToday" checked={filters.borrowedToday} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--today"></span> Due today
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="borrowedOverdue" checked={filters.borrowedOverdue} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--overdue"></span> Overdue
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="accepted" checked={filters.accepted} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--accepted"></span> Accepted
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="pending" checked={filters.pending} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--pending"></span> Pending
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="returned" checked={filters.returned} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--returned"></span> Returned
                </div>
                <div className="legend__item">
                    <input className='legend__input' type="checkbox" name="declined" checked={filters.declined} onChange={handleCheckboxChange} />
                    <span className="legend__color legend__color--declined"></span> Declined
                </div>
            </div>
        </div>
    );
};

export default Legend;
