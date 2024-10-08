import './ItemDetails.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import BackButton from '../BackButton/BackButton';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import DeleteModal from '../DeleteModal/DeleteModal';
import ListSwitch from '../ListSwitch/ListSwitch';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

const ItemDetails = ({ item, refreshItems }) => {
    const { userId } = useUser();
    const [itemStatus, setItemStatus] = useState(item.status);
    const [borrowRequests, setBorrowRequests] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [dateError, setDateError] = useState('');
    const [requestError, setRequestError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchBorrowRequests();
    }, [item.id, API_URL]);

    const fetchBorrowRequests = async () => {
        try {
            const response = await axios.get(`${API_URL}/borrow-requests/item/${item.id}`);
            setBorrowRequests(response.data);
        } catch (err) {
            console.error('Error fetching borrow requests:', err);
            setRequestError('Failed to fetch borrow requests.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/items/${item.id}`);
            console.log('Item deleted');
            setIsModalActive(false);
            refreshItems();
            navigate(`/items`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const toggleStatus = async isChecked => {
        const newStatusId = isChecked ? 1 : 2;
        const newStatus = isChecked ? 'Listed' : 'Inactive';

        try {
            await axios.put(`${API_URL}/items/${item.id}/status`, { status_id: newStatusId });
            setItemStatus(newStatus);
            item.status_id = newStatusId;
            setIsUpdating(false);
        } catch (err) {
            console.error('Error updating item status:', err);
            setIsUpdating(false);
        }
    };

    const validateDates = () => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) {
            setDateError('Both start date and end date are required.');
            return false;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today || end < today) {
            setDateError('Start date and end date must be today or later.');
            return false;
        }

        if (start >= end) {
            setDateError('End date must be after start date.');
            return false;
        }

        setDateError('');
        return true;
    };

    const handleRequest = async () => {
        setSuccessMessage('');

        if (!validateDates()) {
            return;
        }

        const [startDate, endDate] = dateRange;

        try {
            const borrowRequest = {
                borrower_id: userId,
                lender_id: item.user_id,
                item_id: item.id,
                start_date: startDate,
                end_date: endDate,
                borrow_status_id: 1
            };

            console.log('Creating borrow request with data:', borrowRequest);

            await axios.post(`${API_URL}/borrow-requests`, borrowRequest);
            console.log('Borrow request created');
            setRequestError('');
            setSuccessMessage('Borrow request created successfully.');
            fetchBorrowRequests();
        } catch (err) {
            console.error('Error creating borrow request:', err);
            console.error(err.response?.data);
            if (err.response && err.response.data && err.response.data.error) {
                setRequestError(err.response.data.error);
            } else {
                setRequestError('Failed to create borrow request.');
            }
        }
    };

    const formatDate = date => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <section className='item-details'>
            <div className='item-details__content'>
                <div className='item-details__header'>
                    <div className='item-details__icons'>
                        <BackButton to={-1} />
                        <div className='item-details__icons--right'>
                            {userId === item.user_id && (
                                <>
                                    {userId === item.user_id && (
                                        <ListSwitch
                                            isChecked={itemStatus === 'Listed'}
                                            onSwitchChange={toggleStatus}
                                        />
                                    )}
                                    <EditButton to={`/items/${item.id}/edit`} />
                                    <DeleteButton onClick={() => setIsModalActive(true)} />
                                    <DeleteModal
                                        name={item.name}
                                        isActive={isModalActive}
                                        onClose={() => setIsModalActive(false)}
                                        onConfirmDelete={handleDelete}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <h1 className='item-details__title'>{item.name}</h1>
                </div>
                <div className='item-details__main'>
                    <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.name}
                        className='item-details__image'
                    />
                    <p className='item-details__description'>{item.description}</p>
                    <div className='item-details__details'>
                        <p className='item-details__category'>Category: {item.category}</p>
                        <p className='item-details__owner'>
                            Owner:{' '}
                            <Link to={`/${item.user_id}/items`}>{item.owner}</Link>
                        </p>
                    </div>
                    <div className='item-details__bottom'>
                        {userId !== item.user_id && (
                            <div className='item-details__request'>
                                <DateRangePicker
                                    value={dateRange}
                                    onChange={(newValue) => {
                                        setDateRange(newValue);
                                        setSuccessMessage('');
                                    }}
                                />
                                {dateError && (
                                    <p className='item-details__error'>{dateError}</p>
                                )}
                                {requestError && (
                                    <p className='item-details__error'>{requestError}</p>
                                )}
                                {successMessage && (
                                    <p className='item-details__success'>{successMessage}</p>
                                )}
                                <button
                                    onClick={handleRequest}
                                    className='item-details__button'
                                >
                                    Submit Request
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <aside className='item-details__aside'>
                <h3>Borrow Requests</h3>
                {borrowRequests.length > 0 ? (
                    borrowRequests
                        .filter(
                            request =>
                                request.borrower_id === userId || request.lender_id === userId
                        )
                        .map(request => (
                            <Link
                                to={
                                    userId === item.user_id
                                        ? `/users/${userId}/loaned`
                                        : `/users/${userId}/borrowed`
                                }
                                key={request.id}
                                className='borrow-request'
                            >
                                <p>
                                    <strong>Status:</strong> {request.borrow_status}
                                </p>
                                <p>
                                    <strong>Borrower:</strong>{' '}
                                    {request.borrower_id === userId
                                        ? 'You'
                                        : `${request.borrower_first_name} ${request.borrower_last_name}`}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {formatDate(request.start_date)}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {formatDate(request.end_date)}
                                </p>
                            </Link>
                        ))
                ) : (
                    <p>No borrow requests found.</p>
                )}
            </aside>
        </section>
    );
};

export default ItemDetails;
