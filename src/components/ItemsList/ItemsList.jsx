import './ItemsList.scss'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import BackButton from '../BackButton/BackButton';
// import Filter from '../Filter/Filter';

const ItemsList = ({
    items,
    error,
    userName,
    selectedUserId,
    loggedInUserId
}) => {

    const API_URL = import.meta.env.VITE_API_URL;


    return (
        <section className="items-list">
            {/* <div className='items-list__header'>
                <h1 className='items-list__title'>{selectedUserId === loggedInUserId ? 'My Items' : `${userName}'s Items`}</h1>
            </div> */}
            <div className="items-list__grid">
                {error && <p className="items-list__error">{error}</p>}
                {items.length > 0 && (
                    <>
                        {items.map(item => (
                            <article key={item.id} className="items-list__item">
                                <Link to={`/items/${item.id}`}>
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="items-list__image" />
                                    <h3 className='items-list__name'>{item.name}</h3>
                                </Link>
                            </article>
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default ItemsList;