import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BorrowedItems.scss';
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/BackButton/BackButton';

const BorrowedItems = () => {
    const { userId } = useUser();
    const [borrowedItems, setBorrowedItems] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchBorrowedItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/borrow-requests/borrower/${userId}`);
                setBorrowedItems(response.data);
                console.log('Fetched borrowed items:', response.data);
            } catch (err) {
                console.error('Error fetching borrowed items:', err);
            }
        };

        fetchBorrowedItems();
    }, [API_URL, userId]);

    const cancelRequest = async (requestId) => {
        try {
            await axios.delete(`${API_URL}/borrow-requests/${requestId}`);
            setBorrowedItems(borrowedItems.filter(item => item.id !== requestId));
            console.log('Borrow request cancelled');
        } catch (err) {
            console.error('Error cancelling borrow request:', err);
        }
    };

    const totalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getStatusLabel = (statusId) => {
        switch (statusId) {
            case 1:
                return 'Pending';
            case 2:
                return 'Accepted';
            case 3:
                return 'Borrowed';
            case 4:
                return 'Returned';
            case 5:
                return 'Declined';
            default:
                return 'Unknown';
        }
    };

    return (
        <section className='borrowed-items'>
            <div className='borrowed-items__icons'>
                <BackButton to={-1} />
            </div>
            <h1 className='borrowed-items__title'>Borrowed Items</h1>
            <div className='borrowed-items__grid'>
                {borrowedItems.length > 0 ? (
                    borrowedItems.map(item => (
                        <Link to={`/items/${item.item_id}`} className='borrowed-items__card' key={item.id}>
                            <div className='borrowed-items__details'>
                                {item.item_image ? (
                                    <img src={`${API_URL}/uploads/${item.item_image}`} alt={item.item_name} className='borrowed-items__image' />
                                ) : (
                                    'No Image'
                                )}
                                <div className='borrowed-items__info'>
                                    <h3>{item.item_name}</h3>
                                    <p>Lender: {item.lender_first_name} {item.lender_last_name}</p>
                                    <p>Borrower: {item.borrower_first_name} {item.borrower_last_name}</p>
                                    <p>Start Date: {new Date(item.start_date).toLocaleDateString()}</p>
                                    <p>End Date: {new Date(item.end_date).toLocaleDateString()}</p>
                                    <p>Total Days: {totalDays(item.start_date, item.end_date)}</p>
                                    <p>Status: {getStatusLabel(item.borrow_status_id)}</p>
                                    {item.borrow_status_id === 1 && (
                                        <button
                                            onClick={(e) => { e.preventDefault(); cancelRequest(item.id); }}
                                            className='borrowed-items__cancel-button'
                                        >
                                            Cancel Request
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No borrowed items found</p>
                )}
            </div>
        </section>
    );
};

export default BorrowedItems;
