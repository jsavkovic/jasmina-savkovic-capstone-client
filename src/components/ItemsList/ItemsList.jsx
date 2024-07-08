import './ItemsList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsList = ({ userId, category }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!userId || !category) {
            setError('Invalid userId or category');
            return;
        }

        const fetchItems = async () => {
            try {
                console.log(`Fetching from URL: ${API_URL}/items/${userId}/${category}`);
                const response = await axios.get(`${API_URL}/items/${userId}/${category}`);
                console.log('API Response:', response); // Log the full response

                if (response.status === 204) {
                    setError('No items found');
                } else {
                    setItems(response.data);
                }
            } catch (err) {
                console.error('Error fetching items:', err.message, err.stack); // Log detailed error
                setError('Failed to fetch items');
            }
        };

        fetchItems();
    }, [API_URL, userId, category]);

    return (
        <section className="items-list">
            {error && <p className="error">{error}</p>}
            {items.map(item => (
                <article key={item.id} className="items-list__item">
                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="items-list__image" />
                    <h3>{item.name}</h3>
                </article>
            ))}
        </section>
    );
};

export default ItemsList;