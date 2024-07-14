import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoanedItems.scss';
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/BackButton/BackButton';

const LoanedItems = () => {
    const { userId } = useUser();
    const [loanedItems, setLoanedItems] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchLoanedItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/borrow-requests/lender/${userId}`);
                setLoanedItems(response.data);
                console.log('Fetched loaned items:', response.data);
            } catch (err) {
                console.error('Error fetching loaned items:', err);
            }
        };

        fetchLoanedItems();
    }, [API_URL, userId]);

    const cancelRequest = async (requestId) => {
        try {
            await axios.delete(`${API_URL}/borrow-requests/${requestId}`);
            setLoanedItems(loanedItems.filter(item => item.id !== requestId));
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
        <section className='loaned-items'>
            <div className='loaned-items__icons'>
                <BackButton to={-1} />
            </div>
            <h1 className='loaned-items__title'>Loaned Items</h1>
            {loanedItems.length > 0 ? (
                <div className='loaned-items__grid'>
                    {loanedItems.map(item => (
                        <div key={item.id} className='loaned-items__item'>
                            <Link to={`/items/${item.item_id}`}>
                                <img src={`${API_URL}/uploads/${item.item_image}`} alt={item.item_name} className='loaned-items__image' />
                            </Link>
                            <div className='loaned-items__details'>
                                <h3>{item.item_name}</h3>
                                <p>Lender: {item.lender_first_name} {item.lender_last_name}</p>
                                <p>Borrower: {item.borrower_first_name} {item.borrower_last_name}</p>
                                <p>Start Date: {new Date(item.start_date).toLocaleDateString()}</p>
                                <p>End Date: {new Date(item.end_date).toLocaleDateString()}</p>
                                <p>Total Days: {totalDays(item.start_date, item.end_date)}</p>
                                <p>Status: {getStatusLabel(item.borrow_status_id)}</p>
                                {item.borrow_status_id === 1 && (
                                    <button
                                        onClick={() => cancelRequest(item.id)}
                                        className='loaned-items__cancel-button'
                                    >
                                        Cancel Request
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No loaned items found</p>
            )}
        </section>
    );
};

export default LoanedItems;
