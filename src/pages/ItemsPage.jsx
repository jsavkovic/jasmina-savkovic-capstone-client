import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsList from '../components/ItemsList/ItemsList';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import './ItemsPage.scss';

const ItemsPage = () => {
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                console.log(`Fetching user name from URL: ${API_URL}/user/${userId}/items`);
                const response = await axios.get(`${API_URL}/user/${userId}/items`);
                const items = response.data;

                if (items.length > 0) {
                    const firstItem = items[0];
                    setUserName(firstItem.owner);
                } else {
                    setUserName('No Items Found');
                }
            } catch (err) {
                console.error('Error fetching user name:', err);
            }
        };

        fetchUserName();
    }, [API_URL, userId]);

    return (
        <main>
            <Header />
            <div className='items__header'>
                <h1>{userName ? `${userName}'s Items` : 'All Items'}</h1>
                <Filter />
            </div>
            <ItemsList userId={userId} />
        </main>
    );
};

export default ItemsPage;
