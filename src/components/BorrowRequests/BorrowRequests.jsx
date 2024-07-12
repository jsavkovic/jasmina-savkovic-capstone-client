import { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowRequests.scss';

const BorrowRequests = ({ userId }) => {
    const [borrowRequests, setBorrowRequests] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchBorrowRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/borrow-requests/lender/${userId}`);
                setBorrowRequests(response.data);
                console.log('Fetched borrow requests:', response.data);
            } catch (err) {
                console.error('Error fetching borrow requests:', err);
            }
        };
        fetchBorrowRequests();
    }, [API_URL, userId]);

    const updateBorrowRequestStatus = async (requestId, newStatus, itemId, itemStatus) => {
        try {
            await axios.put(`${API_URL}/borrow-requests/${requestId}`, { borrow_status_id: newStatus });
            if (itemStatus !== undefined) {
                await axios.put(`${API_URL}/items/${itemId}/status`, { status_id: itemStatus });
            }
            setBorrowRequests(borrowRequests.map(request =>
                request.id === requestId ? { ...request, borrow_status_id: newStatus } : request
            ))
        } catch (err) {
            console.error(`Error updating borrow request status:`, err);
        }
    };

    const handleAccept = (request) => {
        updateBorrowRequestStatus(request.id, 2, request.item_id, 2);
    };

    const handleBorrowed = (request) => {
        updateBorrowRequestStatus(request.id, 3);
    };

    const handleDecline = (request) => {
        updateBorrowRequestStatus(request.id, 4);
    };

    const handleReturned = (request) => {
        updateBorrowRequestStatus(request.id, 5, request.item_id, 1);
    };

    return (
        <section className='borrow-req'>
            <h2 className='borrow-req__title'>Borrow Requests</h2>
            <div className='borrow-req__table'>
                <div className='borrow-req__header'>
                    <div>Image</div>
                    <div>Item</div>
                    <div>Borrower</div>
                    <div>Requested On</div>
                    <div>Actions</div>
                </div>
                {borrowRequests.length > 0 ? (
                    borrowRequests.map(request => (
                        <div className='borrow-req__row' key={request.id}>
                            <div className='borrow-req__details'>
                                {request.item_image ? (
                                    <img src={`${API_URL}/uploads/${request.item_image}`} alt={request.item_name} className='borrow-req__image' />
                                ) : (
                                    'No Image'
                                )}
                            </div>
                            <div className='borrow-req__details'>
                                {request.item_name}
                            </div>
                            <div className='borrow-req__details'>
                                {request.borrower_first_name} {request.borrower_last_name}
                            </div>
                            <div className='borrow-req__details'>
                                {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'Date not available'}
                            </div>
                            <div className='borrow-req__details'>
                                {request.borrow_status_id === 1 && ( // Pending status
                                    <>
                                        <button className='borrow-req__action' onClick={() => handleAccept(request)}>Accept</button>
                                        <button className='borrow-req__action borrow-req__action--ignore' onClick={() => handleDecline(request)}>Decline</button>
                                    </>
                                )}
                                {request.borrow_status_id === 2 && ( // Accepted status
                                    <>
                                        <button className='borrow-req__action' onClick={() => handleBorrowed(request)}>Borrowed</button>
                                        <button className='borrow-req__action borrow-req__action--ignore' onClick={() => handleReturned(request)}>Returned</button>
                                    </>
                                )}
                                {request.borrow_status_id === 3 && ( // Borrowed status
                                    <button className='borrow-req__action' onClick={() => handleReturned(request)}>Returned</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='borrow-req__row'>No borrow requests found</div>
                )}
            </div>
        </section>
    );
};

export default BorrowRequests;