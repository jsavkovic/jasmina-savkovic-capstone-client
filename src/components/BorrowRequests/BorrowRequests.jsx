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

    return (
        <section className='borrow-req'>
            <h2 className='borrow-req__title'>Borrow Requests</h2>
            <div className='borrow-req__table'>
                <div className='borrow-req__header'>
                    <div>Image</div>
                    <div>Name</div>
                    <div>Borrower</div>
                    <div>Requested On</div>
                    <div>Actions</div>
                </div>
                {borrowRequests.length > 0 ? (
                    borrowRequests.map(request => (
                        <div className='borrow-req__row' key={request.id}>
                            <div><img src={`${API_URL}/uploads/${request.item_image}`} alt={request.item_name} className='borrow-req__image' /> </div>
                            <div>{request.item_name}</div>
                            <div>{request.borrower_first_name} {request.borrower_last_name}</div>
                            <div>{new Date(request.created_at).toLocaleDateString()}</div>
                            <div><button>Action</button></div>
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