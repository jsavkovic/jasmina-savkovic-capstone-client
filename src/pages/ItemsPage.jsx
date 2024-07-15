import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import ItemsList from '../components/ItemsList/ItemsList';
import ArchivedItems from '../components/ArchivedItems/ArchivedItems';
import Footer from '../components/Footer/Footer';
import { useUser } from '../context/UserContext';

const ItemsPage = () => {
    const { friendId } = useParams();
    const location = useLocation();
    const friendNameFromState = location.state?.friendName || null;
    const { userId: loggedInUserId } = useUser();
    const [activeItems, setActiveItems] = useState([]);
    const [inactiveItems, setInactiveItems] = useState([]);
    const [error, setError] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [friendName, setFriendName] = useState(friendNameFromState);
    const [filters, setFilters] = useState({ type: '' });
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const userId = friendId || loggedInUserId;

        const fetchItems = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get(`${API_URL}/items/user/${userId}`, {
                        params: {
                            status_id: 1,
                            type_id: filters.type || undefined,
                            borrow_status_id: filters.status || undefined,
                        }
                    }),
                    axios.get(`${API_URL}/items/user/${userId}`, {
                        params: {
                            status_id: 2,
                            type_id: filters.type || undefined,
                            borrow_status_id: filters.status || undefined,
                        }
                    })
                ]);

                setActiveItems(response1.data);
                setInactiveItems(response2.data);
            } catch (err) {
                console.error('Error fetching items:', err.message, err.stack);
                setError('Failed to fetch items');
            }
        };

        fetchItems();
    }, [API_URL, friendId, loggedInUserId, filters]);

    useEffect(() => {
        const fetchItemTypes = async () => {
            try {
                const response = await axios.get(`${API_URL}/items/item-types`);
                setItemTypes(response.data);
            } catch (err) {
                console.error('Error fetching item types:', err);
            }
        };

        fetchItemTypes();
    }, [API_URL]);

    useEffect(() => {
        const fetchFriendName = async () => {
            if (!friendName && friendId) {
                try {
                    const response = await axios.get(`${API_URL}/user/${friendId}`);
                    setFriendName(response.data.first_name);
                } catch (err) {
                    console.error('Error fetching friend name:', err);
                }
            }
        };

        fetchFriendName();
    }, [friendName, friendId, API_URL]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    return (
        <>
            <Header />
            <main>
                <ItemsList
                    items={activeItems}
                    error={error}
                    loggedInUserId={loggedInUserId}
                    userName={friendName || "My"}
                    friendId={friendId}
                    itemTypes={itemTypes}
                    onFilterChange={handleFilterChange}
                />
                <ArchivedItems items={inactiveItems} API_URL={API_URL} />
            </main>
            <Footer />
        </>
    );
};

export default ItemsPage;
