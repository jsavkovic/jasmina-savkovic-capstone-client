import './ItemDetails.scss';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import BackButton from '../BackButton/BackButton'
import EditButton from '../EditButton/EditButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import DeleteModal from '../DeleteModal/DeleteModal';

// const ItemDetails = ({ item, refreshItems, userId }) => {
const ItemDetails = ({ item, refreshItems }) => {
    const { userId } = useUser();
    const [itemStatus, setItemStatus] = useState(item.status);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    // when user clicks on request button
    const [isRequestPending, setIsRequestPending] = useState(false);
    const [showDateInputs, setShowDateInputs] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateError, setDateError] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;


    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/items/${item.id}`);
            console.log('Item deleted');
            setIsModalActive(false);
            refreshItems();
            navigate(`/users/${userId}/items`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (!item) {
        return <p>No item details available.</p>;
    };


    const toggleStatus = async () => {
        const newStatusId = item.status_id === 1 ? 2 : 1;
        const newStatus = newStatusId === 1 ? 'Listed' : 'Inactive';

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
        if (!startDate || !endDate) {
            setDateError('Both start date and end date are required.');
            return false;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            setDateError('End date must be after start date.');
            return false;
        }

        setDateError('');
        return true;
    };


    const handleRequest = async () => {
        if (!validateDates()) {
            return;
        }

        try {
            const borrowRequest = {
                borrower_id: userId,
                lender_id: item.user_id,
                item_id: item.id,
                start_date: startDate,
                end_date: endDate,
                borrow_status_id: 1,
            };

            await axios.post(`${API_URL}/borrow-requests`, borrowRequest);
            console.log('Borrow request created');
        } catch (err) {
            console.error('Error creating borrow request:', err);
        }
    };

    return (
        <section className='item-details'>
            <div className='item-details__icons'>
                <BackButton to={`/users/${item.user_id}/items`} />
                <div className='item-details__icons--right'>
                    <EditButton to={`/items/${item.id}/edit`} />
                    <DeleteButton onClick={() => setIsModalActive(true)} />
                    <DeleteModal
                        name={item.name}
                        isActive={isModalActive}
                        onClose={() => setIsModalActive(false)}
                        onConfirmDelete={handleDelete}
                    />
                </div>
            </div>
            <div className='item-details__header'>
                <h1 className='item-details__title'>{item.name}</h1>
            </div>
            <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="item-details__image" />
            {userId !== item.user_id && (
                <>
                    <button onClick={() => setShowDateInputs(true)} className='item-details__button' disabled={isRequestPending}>
                        {isRequestPending ? 'Pending request...' : 'Request'}
                    </button>
                    {showDateInputs && !isRequestPending && (
                        <div className='item-details__date'>
                            <label>Start Date:
                                <input type='date'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} />
                            </label>
                            <label>End Date:
                                <input type='date'
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} />
                            </label>
                            {dateError && <p className='item-details__error'>{dateError}</p>}
                            <button onClick={handleRequest} className='item-details__button'>
                                Submit Request
                            </button>
                        </div>
                    )}
                </>

            )}
            <p className='item-details__description'>{item.description}</p>
            <div className='item-details__details'>
                <p className='item-details__category'>Category: {item.category}</p>
                <p className='item-details__owner'>
                    Owner: <Link to={`/users/${item.user_id}/items`}>{item.owner}</Link>
                </p>
            </div>
            <div className='item-details__bottom'>
                <p className={`item-details__status item-details__status--${itemStatus === 'Listed' ? 'green' : 'grey'}`}>
                    {itemStatus}
                </p>
                <button
                    onClick={toggleStatus}
                    disabled={isUpdating}
                    className='item-details__button'
                >
                    {itemStatus === 'Listed' ? 'Archive Item' : 'List Item'}
                </button>
            </div>
        </section>
    );
};

export default ItemDetails;