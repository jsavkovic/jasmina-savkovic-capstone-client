import { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendRequests.scss';

const BorrowRequests = ({ userId }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/friends/pending/${userId}`);
                setFriendRequests(response.data);
                console.log('Fetched friend requests:', response.data);
            } catch (err) {
                console.error('Error fetching friend requests:', err);
            }
        };
        fetchFriendRequests();
    }, [API_URL, userId]);

    return (
        <section className='friend-req'>
            <h2 className='friend-req__title'>Friend Requests</h2>
            <div className='friend-req__table'>
                <div className='friend-req__header'>
                    <div>Image</div>
                    <div>Name</div>
                    <div>Requested On</div>
                    <div>Actions</div>
                </div>
                {friendRequests.length > 0 ? (
                    friendRequests.map(request => (
                        <div className='friend-req__row' key={request.id}>
                            <div className='friend-req__details'>
                                {request.image ? (
                                    <img src={`${API_URL}/uploads/users/${request.image}`} alt={request.first_name} className='friend-req__image' />
                                ) : (
                                    'No Image'
                                )}
                            </div>
                            <div className='friend-req__details'>
                                {request.first_name} {request.last_name}
                            </div>
                            <div className='friend-req__details'>
                                {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'Date not available'}
                            </div>
                            <div className='friend-req__details'>
                                <button className='friend-req__action'>Accept</button>
                                <button className='friend-req__action friend-req__action--ignore'>Ignore</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='friend-req__row'>No friend requests found</div>

                )}
            </div>
        </section>
    );
};

export default BorrowRequests;