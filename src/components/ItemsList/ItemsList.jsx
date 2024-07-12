import './ItemsList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import Filter from '../Filter/Filter';

const ItemsList = ({ selectedUserId, loggedInUserId }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                console.log(`Fetching user name from URL: ${API_URL}/user/${selectedUserId}`);
                const response = await axios.get(`${API_URL}/user/${selectedUserId}`);
                const user = response.data;

                if (user) {
                    setUserName(user.first_name);
                } else {
                    setUserName('User not found');
                }
            } catch (err) {
                console.error('Error fetching user name:', err);
            }
        };

        fetchUserName();
    }, [API_URL, selectedUserId]);

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
            <div className='items-list__header'>
                <div className="items-list__icons">
                    <BackButton to={-1} />
                    <Filter />
                </div>
                <h1 className='items-list__title'>{selectedUserId === loggedInUserId ? 'My Items' : `${userName}'s Items`}</h1>
            </div>
            <div className="items-list__grid">
                {error && <p className="error">{error}</p>}
                {items.map(item => (
                    <article key={item.id} className="items-list__item">
                        <Link to={`/items/${item.id}`}>
                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="items-list__image" />
                            <h3 className='items-list__name'>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ItemsList;