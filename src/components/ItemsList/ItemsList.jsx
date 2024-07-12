import './ItemsList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ItemsList = ({ selectedUserId, loggedInUserId }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!selectedUserId) {
            setError('Invalid User Id');
            return;
        }

        const fetchItems = async () => {
            try {
                console.log(`Fetching from URL: ${API_URL}/user/${selectedUserId}/items?status_id=1`);
                const response = await axios.get(`${API_URL}/user/${selectedUserId}/items?status_id=1`);
                console.log('API Response:', response);

                if (response.status === 204) {
                    setError('No items found');
                } else {
                    setItems(response.data);
                }
            } catch (err) {
                console.error('Error fetching items:', err.message, err.stack);
                setError('Failed to fetch items');
            }
        };

        fetchItems();
    }, [API_URL, selectedUserId]);

    return (
        <section className="items-list">
            {error && <p className="error">{error}</p>}
            {items.map(item => (
                <article key={item.id} className="items-list__item">
                    <Link to={`/items/${item.id}`}>
                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="items-list__image" />
                        <h3 className='items-list__title'>{item.name}</h3>
                    </Link>
                </article>
            ))}
        </section>
    );
};

export default ItemsList;