import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsList from '../components/ItemsList/ItemsList';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import Footer from '../components/Footer/Footer';
import './ItemsPage.scss';
import { useUser } from '../context/UserContext';

const ItemsPage = () => {
    const { userId: selectedUserId } = useParams();
    const { userId: loggedInUserId } = useUser();
    const [userName, setUserName] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                console.log(`Fetching user name from URL: ${API_URL}/user/${userId}`);
                const response = await axios.get(`${API_URL}/user/${userId}`);
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

    return (
        <>
            <Header />
            <main>

                <div className='items__header'>
                    <h1>{userName ? `${userName}'s Items` : 'All Items'}</h1>
                    <Filter />
                </div>
                <ItemsList selectedUserId={selectedUserId} loggedInUserId={loggedInUserId} />
            </main>
            <Footer />
        </>
    );
};

export default ItemsPage;
