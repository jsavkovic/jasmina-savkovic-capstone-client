import './FriendList.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FriendList = ({ userId }) => {
    const [friends, setFriends] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${API_URL}/friends/${userId}/friends`);
                setFriends(response.data);
                console.log('Fetched friends:', response.data);
            } catch (err) {
                console.error('Error fetching friends list:', err);
            }
        };
        fetchFriends();
    }, [API_URL, userId]);

    return (
        <main className='friends'>
            <h2 className='friends__title'>Friends</h2>
            {friends.length > 0 ? (
                <ul>
                    {friends.map(friend => (
                        <li key={friend.id} className='friends__item'>
                            <Link to={`/users/${friend.id}/items`} className='friends__link'>
                                <img src={`${API_URL}/uploads/users/${friend.image}`} alt={`${friend.first_name} ${friend.last_name}`} className='friends__image' />
                                <div className='friends__details'>
                                    <h3 className='friends__name'>{friend.first_name} {friend.last_name}</h3>
                                    <p className='friends__email'>{friend.email}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friends found</p>
            )}
        </main>
    );
};

export default FriendList;