import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoanedItems.scss';
import Legend from '../Legend/Legend';
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/BackButton/BackButton';

const LoanedItems = () => {
    const { userId } = useUser();
    const [loanedItems, setLoanedItems] = useState([]);
    const [filters, setFilters] = useState({
        borrowedSoon: false,
        borrowedToday: false,
        borrowedOverdue: false,
        borrowed: false,
        accepted: false,
        pending: false,
        returned: false,
        declined: false
    });
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

    const handleStatusUpdate = async (requestId, status) => {
        try {
            await axios.put(`${API_URL}/borrow-requests/${requestId}`, { borrow_status_id: status });
            setLoanedItems(loanedItems.map(item => item.id === requestId ? { ...item, borrow_status_id: status } : item));
            console.log(`Borrow request ${requestId} status updated to ${status}`);
        } catch (err) {
            console.error(`Error updating borrow request ${requestId} status to ${status}:`, err.response ? err.response.data : err.message);
        }
    };

    const handleAcceptRequest = (requestId) => handleStatusUpdate(requestId, 2); // 2 for accepted
    const handleDeclineRequest = (requestId) => handleStatusUpdate(requestId, 5); // 5 for declined
    const handlePickUpRequest = (requestId) => handleStatusUpdate(requestId, 3); // 3 for borrowed
    const handleReturnRequest = (requestId) => handleStatusUpdate(requestId, 4); // 4 for returned
    const handleCancelRequest = (requestId) => handleStatusUpdate(requestId, 6); // 6 for cancelled

    const totalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getDaysUntilDue = (endDate) => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getDaysUntilPickup = (startDate) => {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = start - today;
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
            case 6:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    const getStatusOrder = (statusId) => {
        switch (statusId) {
            case 1:
                return 1; // Pending
            case 3:
                return 2; // Borrowed
            case 2:
                return 3; // Accepted
            case 4:
                return 4; // Returned
            case 5:
                return 5; // Declined
            case 6:
                return 6; // Cancelled
            default:
                return 7; // Unknown
        }
    };

    const isAnyFilterSelected = Object.values(filters).some(filter => filter);

    const filteredLoanedItems = loanedItems.filter(item => {
        if (!isAnyFilterSelected) return true;

        const daysUntilDue = getDaysUntilDue(item.end_date);
        const daysUntilPickup = getDaysUntilPickup(item.start_date);

        if (filters.borrowedSoon && item.borrow_status_id === 3 && daysUntilDue <= 2 && daysUntilDue > 0) return true;
        if (filters.borrowedToday && item.borrow_status_id === 3 && daysUntilDue === 0) return true;
        if (filters.borrowedOverdue && item.borrow_status_id === 3 && daysUntilDue < 0) return true;
        if (filters.borrowed && item.borrow_status_id === 3) return true;
        if (filters.accepted && item.borrow_status_id === 2) return true;
        if (filters.pending && item.borrow_status_id === 1) return true;
        if (filters.returned && item.borrow_status_id === 4) return true;
        if (filters.declined && item.borrow_status_id === 5) return true;
        return false;
    });

    const sortedLoanedItems = filteredLoanedItems.slice().sort((a, b) => {
        const statusOrderDiff = getStatusOrder(a.borrow_status_id) - getStatusOrder(b.borrow_status_id);
        if (statusOrderDiff !== 0) return statusOrderDiff;

        const aDueDate = new Date(a.end_date);
        const bDueDate = new Date(b.end_date);
        return aDueDate - bDueDate;
    });

    const getCardClassName = (item) => {
        if (item.borrow_status_id === 2) return '--pickup';
        if (item.borrow_status_id !== 3) return '';

        const daysUntilDue = getDaysUntilDue(item.end_date);
        if (daysUntilDue < 0) return '--overdue';
        if (daysUntilDue === 0) return '--today';
        if (daysUntilDue <= 2) return '--soon';
        return '';
    };

    return (
        <section className='loaned-items'>
            <div className='loaned-items__icons'>
                <BackButton to={-1} />
                <Legend filters={filters} setFilters={setFilters} />
            </div>
            <h1 className='loaned-items__title'>Loaned Items</h1>
            <div className='loaned-items__grid'>
                {sortedLoanedItems.length > 0 ? (
                    sortedLoanedItems.map(item => (
                        <Link to={`/items/${item.item_id}`} className={`loaned-items__card loaned-items__card${getCardClassName(item)}`} key={item.id}>
                            <div className='loaned-items__image'>
                                {item.item_image ? (
                                    <img src={`${API_URL}/uploads/${item.item_image}`} alt={item.item_name} />
                                ) : (
                                    'No Image'
                                )}
                            </div>
                            <div className='loaned-items__details'>
                                <div className='loaned-items__info'>
                                    <h3 className='loaned-items__name'>{item.item_name}</h3>
                                    <p>Lender: <strong>{item.lender_first_name} {item.lender_last_name}</strong></p>
                                    <p>Borrower: <strong>{item.borrower_first_name} {item.borrower_last_name}</strong></p>
                                    <p>Start: <strong>{new Date(item.start_date).toLocaleDateString()}</strong></p>
                                    <p>End: <strong>{new Date(item.end_date).toLocaleDateString()}</strong></p>
                                    <p>Total: <strong>{totalDays(item.start_date, item.end_date)} days</strong></p>
                                    <p>Status: <strong>{getStatusLabel(item.borrow_status_id)}</strong></p>

                                    {item.borrow_status_id === 3 && (
                                        <p className={`loaned-items__duedate loaned-items__duedate${getCardClassName(item)}`}>
                                            {getDaysUntilDue(item.end_date) < 0
                                                ? `Overdue by ${Math.abs(getDaysUntilDue(item.end_date))} days`
                                                : getDaysUntilDue(item.end_date) === 0
                                                    ? 'Due today'
                                                    : `Due in ${getDaysUntilDue(item.end_date)} days`}
                                        </p>
                                    )}
                                    {item.borrow_status_id === 2 && (
                                        <p className={`loaned-items__pickup loaned-items__pickup${getCardClassName(item)}`}>
                                            {getDaysUntilPickup(item.start_date) === 0
                                                ? 'Pick up today'
                                                : `Pick up in ${getDaysUntilPickup(item.start_date)} days`}
                                        </p>
                                    )}
                                    {item.borrow_status_id === 1 && (
                                        <div className='loaned-items__actions'>
                                            <button
                                                onClick={() => handleAcceptRequest(item.id)}
                                                className='loaned-items__action-button'
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDeclineRequest(item.id)}
                                                className='loaned-items__action-button loaned-items__action-button--cancel'
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    )}

                                    {item.borrow_status_id === 2 && (
                                        <div className='loaned-items__actions'>
                                            <button
                                                onClick={(e) => { e.preventDefault(); handlePickUpRequest(item.id); }}
                                                className='loaned-items__action-button'
                                            >
                                                Picked Up
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); handleCancelRequest(item.id); }}
                                                className='loaned-items__action-button loaned-items__action-button--cancel'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}

                                    {item.borrow_status_id === 3 && (
                                        <div className='loaned-items__actions'>
                                            <button
                                                onClick={(e) => { e.preventDefault(); handleReturnRequest(item.id); }}
                                                className='loaned-items__action-button'
                                            >
                                                Returned
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); handleCancelRequest(item.id); }}
                                                className='loaned-items__action-button loaned-items__action-button--cancel'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No loaned items found</p>
                )}
            </div>
        </section>
    );
};

export default LoanedItems;
