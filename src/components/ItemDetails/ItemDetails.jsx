import './ItemDetails.scss';
import { useState } from 'react';
import axios from 'axios';
// import { API_URL } from './config.js';

const ItemDetails = ({ item }) => {
    const [itemStatus, setItemStatus] = useState(item.status);
    const [isUpdating, setIsUpdating] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    if (!item) {
        return <p>No item details available.</p>;
    }

    const toggleStatus = async () => {
        const newStatusId = item.status_id === 1 ? 2 : 1; // Assuming 1 is listed and 2 is inactive
        const newStatus = newStatusId === 1 ? 'Listed' : 'Inactive';

        try {
            await axios.put(`${API_URL}/items/${item.id}`, { status_id: newStatusId });
            setItemStatus(newStatus);
            item.status_id = newStatusId;
            setIsUpdating(false);

        } catch (err) {
            console.error('Error updating item status:', err);
            setIsUpdating(false);
        }
    };

    return (
        <section className='item-details'>
            <div className='item-details__header'>
                <h1 className='item-details__title'>{item.name}</h1>
                <button
                    onClick={toggleStatus}
                    disabled={isUpdating}
                    className='item-details__button'
                >
                    {itemStatus === 'Listed' ? 'Archive Item' : 'List Item'}
                </button>
            </div>
            <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="item-details__image" />
            {/* <h1 className='item-details__title'>{item.name}</h1> */}
            <p className='item-details__description'>{item.description}</p>
            <div className='item-details__details'>
                <p className='item-details__category'>Category: {item.category}</p>
                <p className='item-details__owner'>Owner: {item.owner}</p>
            </div>
            <p className={`item-details__status item-details__status--${itemStatus === 'Listed' ? 'green' : 'grey'}`}>
                {itemStatus}
            </p>
        </section>
    );
};

export default ItemDetails;