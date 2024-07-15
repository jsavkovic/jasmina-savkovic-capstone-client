import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './LoanRequests.scss';

const LoanRequests = () => {
    const { userId } = useUser();
    const [loanRequests, setLoanRequests] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchLoanRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/borrow-requests/lender/${userId}`);
                setLoanRequests(response.data);
                console.log('Fetched loan requests:', response.data);
            } catch (err) {
                console.error('Error fetching loan requests:', err);
            }
        };
        fetchLoanRequests();
    }, [API_URL, userId]);

    const updateBorrowStatus = async (requestId, statusId) => {
        try {
            await axios.put(`${API_URL}/borrow-requests/${requestId}/status`, { borrow_status_id: statusId });
            setLoanRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === requestId ? { ...request, borrow_status_id: statusId } : request
                )
            );
            console.log(`Borrow request ${requestId} updated to status ${statusId}`);
        } catch (err) {
            console.error('Error updating borrow status:', err);
        }
    };

    const getStatusLabel = (statusId) => {
        switch (statusId) {
            case 1:
                return 'Requested';
            case 2:
                return 'Accepted';
            case 3:
                return 'Borrowed';
            case 4:
                return 'Declined';
            case 5:
                return 'Returned';
            default:
                return 'Unknown';
        }
    };

    return (
        <section className='loan-requests'>
            <h2 className='loan-requests__title'>Loan Requests</h2>
            <div className='loan-requests__grid'>
                {loanRequests.length > 0 ? (
                    loanRequests.map(request => (
                        <Link to={`/items/${request.item_id}`} className='loan-requests__card' key={request.id}>
                            <div className='loan-requests__details'>
                                {request.item_image ? (
                                    <img src={`${API_URL}/uploads/${request.item_image}`} alt={request.item_name} className='loan-requests__image' />
                                ) : (
                                    'No Image'
                                )}
                                <div className='loan-requests__info'>
                                    <h3>{request.item_name}</h3>
                                    <p>Borrower: {request.borrower_first_name} {request.borrower_last_name}</p>
                                    <p>Start Date: {request.start_date ? new Date(request.start_date).toLocaleDateString() : 'Date not available'}</p>
                                    <p>End Date: {request.end_date ? new Date(request.end_date).toLocaleDateString() : 'Date not available'}</p>
                                    <p>Requested On: {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'Date not available'}</p>
                                    <p>Status: {getStatusLabel(request.borrow_status_id)}</p>
                                </div>
                            </div>
                            <div className='loan-requests__actions'>
                                <button className='loan-requests__button loan-requests__button--accept' onClick={(e) => { e.preventDefault(); updateBorrowStatus(request.id, 2); }}>Accept</button>
                                <button className='loan-requests__button loan-requests__button--decline' onClick={(e) => { e.preventDefault(); updateBorrowStatus(request.id, 4); }}>Decline</button>
                                {request.borrow_status_id === 2 && (
                                    <button className='loan-requests__button loan-requests__button--borrowed' onClick={(e) => { e.preventDefault(); updateBorrowStatus(request.id, 3); }}>Borrow</button>
                                )}
                                {request.borrow_status_id === 3 && (
                                    <button className='loan-requests__button loan-requests__button--return' onClick={(e) => { e.preventDefault(); updateBorrowStatus(request.id, 5); }}>Return</button>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No loan requests found</div>
                )}
            </div>
        </section>
    );
};

export default LoanRequests;
