import './FriendList.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FriendList = ({ userId }) => {
    const [friends, setFriends] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${API_URL}/friends/${userId}`);
                setFriends(response.data);
                console.log({ response })
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
                        <li key={friend.id}>
                            {friend.first_name} {friend.last_name}
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