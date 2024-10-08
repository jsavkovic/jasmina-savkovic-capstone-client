import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BorrowedItems.scss';
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/BackButton/BackButton';
import Legend from '../Legend/Legend';
import CancelButton from '../CancelButton/CancelButton';

const BorrowedItems = () => {
    const { userId } = useUser();
    const [borrowedItems, setBorrowedItems] = useState([]);
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
        const fetchBorrowedItems = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/borrow-requests/borrower/${userId}`
                );
                setBorrowedItems(response.data);
                console.log('Fetched borrowed items:', response.data);
            } catch (err) {
                console.error('Error fetching borrowed items:', err);
            }
        };

        fetchBorrowedItems();
    }, [API_URL, userId]);

    const cancelRequest = async requestId => {
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

    const getDaysUntilDue = endDate => {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getDaysUntilPickup = startDate => {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = start - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getStatusLabel = statusId => {
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

    const getStatusOrder = statusId => {
        switch (statusId) {
            case 3:
                return 1; // Borrowed
            case 2:
                return 2; // Accepted
            case 1:
                return 3; // Pending
            case 4:
                return 4; // Returned
            case 5:
                return 5; // Declined
            default:
                return 6; // Unknown
        }
    };

    const isAnyFilterSelected = Object.values(filters).some(filter => filter);

    const filteredBorrowedItems = borrowedItems.filter(item => {
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

    const sortedBorrowedItems = filteredBorrowedItems.slice().sort((a, b) => {
        const statusOrderDiff =
            getStatusOrder(a.borrow_status_id) - getStatusOrder(b.borrow_status_id);
        if (statusOrderDiff !== 0) return statusOrderDiff;

        const aDueDate = new Date(a.end_date);
        const bDueDate = new Date(b.end_date);
        return aDueDate - bDueDate;
    });

    const getCardClassName = item => {
        if (item.borrow_status_id === 2) return '--pickup';
        if (item.borrow_status_id !== 3) return '';

        const daysUntilDue = getDaysUntilDue(item.end_date);
        if (daysUntilDue < 0) return '--overdue';
        if (daysUntilDue === 0) return '--today';
        if (daysUntilDue <= 2) return '--soon';
        return '';
    };

    return (
        <section className='borrowed-items'>
            <div className='borrowed-items__icons'>
                <BackButton to={-1} />
                <Legend filters={filters} setFilters={setFilters} />
            </div>
            <h1 className='borrowed-items__title'>Borrowed Items</h1>
            <div className='borrowed-items__grid'>
                {sortedBorrowedItems.length > 0 ? (
                    sortedBorrowedItems.map(item => (
                        <Link to={`/items/${item.item_id}`} className={`borrowed-items__card borrowed-items__card${getCardClassName(item)}`} key={item.id}>
                            <div className='borrowed-items__image'>
                                {item.item_image ? (
                                    <img src={`${API_URL}/uploads/${item.item_image}`} alt={item.item_name} />
                                ) : (
                                    'No Image'
                                )}
                            </div>
                            <div className='borrowed-items__details'>
                                <div className='borrowed-items__info'>
                                    <h3 className='borrowed-items__name'>{item.item_name}</h3>
                                    <p>
                                        Lender:{' '}
                                        <strong>
                                            {item.lender_first_name} {item.lender_last_name}
                                        </strong>
                                    </p>
                                    <p>
                                        Start:
                                        <strong>
                                            {new Date(item.start_date).toLocaleDateString()}
                                        </strong>
                                    </p>
                                    <p>
                                        End:{' '}
                                        <strong>
                                            {new Date(item.end_date).toLocaleDateString()}
                                        </strong>
                                    </p>
                                    <p>
                                        Total:{' '}
                                        <strong>
                                            {totalDays(item.start_date, item.end_date)} days
                                        </strong>
                                    </p>
                                    <p>
                                        Status:{' '}
                                        <strong>{getStatusLabel(item.borrow_status_id)}</strong>
                                    </p>
                                    {item.borrow_status_id === 3 && (
                                        <p
                                            className={`borrowed-items__duedate borrowed-items__duedate${getCardClassName(
                                                item
                                            )}`}
                                        >
                                            {getDaysUntilDue(item.end_date) < 0
                                                ? `Overdue by ${Math.abs(getDaysUntilDue(item.end_date))} days`
                                                : getDaysUntilDue(item.end_date) === 0
                                                    ? 'Due today'
                                                    : `Due in ${getDaysUntilDue(item.end_date)} days`}
                                        </p>
                                    )}
                                    {item.borrow_status_id === 2 && (
                                        <p
                                            className={`borrowed-items__pickup borrowed-items__pickup${getCardClassName(
                                                item
                                            )}`}
                                        >
                                            {getDaysUntilPickup(item.start_date) === 0
                                                ? 'Pick up today'
                                                : `Pick up in ${getDaysUntilPickup(item.start_date)} days`}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {item.borrow_status_id === 1 && (
                                <CancelButton
                                    onClick={() => cancelRequest(item.id)}
                                />
                            )}
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
