import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
// import BorrowStatusFilter from '../components/Filter/BorrowStatusFilter';
import ItemsList from '../components/ItemsList/ItemsList';
import ArchivedItems from '../components/ArchivedItems/ArchivedItems'
import Footer from '../components/Footer/Footer';
import './ItemsPage.scss';
import { useUser } from '../context/UserContext';

const ItemsPage = () => {
    const { userId: selectedUserId } = useParams();
    const { userId: loggedInUserId } = useUser();
    const [activeItems, setActiveItems] = useState([]);
    const [inactiveItems, setInactiveItems] = useState([]);
    const [error, setError] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [userName, setUserName] = useState('');
    // const [selectedType, setSelectedType] = useState('');
    const [filters, setFilters] = useState({ type: '' });
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserName = async () => {
            try {
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
                const [response1, response2] = await Promise.all([
                    axios.get(`${API_URL}/items/user/${selectedUserId}`, {
                        params: {
                            status_id: 1,
                            type_id: filters.type || undefined,
                            borrow_status_id: filters.status || undefined,
                        }
                    }),
                    axios.get(`${API_URL}/items/user/${selectedUserId}`, {
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
    }, [API_URL, selectedUserId, filters]);

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

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    // const fetchBorrowRequests = async (statusId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/borrow-requests/lender/${loggedInUserId}`, {
    //             params: {
    //                 borrow_status_id: statusId
    //             }
    //         });
    //         setActiveItems(response.data);
    //     } catch (err) {
    //         console.error('Error fetching borrow requests:', err.message, err.stack);
    //         setError('Failed to fetch borrow requests');
    //     }
    // };

    return (
        <>
            <Header />
            <main>
                <div className='items__header'>
                    <h1 className='items__title'>{selectedUserId === loggedInUserId ? 'My Items' : `${userName}'s Items`}</h1>
                    {itemTypes.length > 0 && (
                        <Filter itemTypes={itemTypes} onFilterChange={handleFilterChange} />
                    )}
                </div>
                {/* <div>
                    <BorrowStatusFilter onFilterChange={(statusId) => fetchBorrowRequests(statusId)} />
                </div> */}
                {/* <div className="items__filter">
                    <Filter itemTypes={itemTypes} onFilterChange={handleFilterChange} />
                </div> */}
                <ItemsList
                    items={activeItems}
                    error={error}
                    userName={userName}
                    selectedUserId={selectedUserId}
                    loggedInUserId={loggedInUserId}
                />
                <ArchivedItems items={inactiveItems} API_URL={API_URL} />
            </main>
            <Footer />
        </>
    );
};

export default ItemsPage;
