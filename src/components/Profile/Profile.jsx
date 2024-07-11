import './Profile.scss';
import EditButton from '../EditButton/EditButton';
import archiveIcon from '../../assets/icons/archive.svg';
import uploadIcon from '../../assets/icons/upload.svg';
import downloadIcon from '../../assets/icons/download.svg';
import listIcon from '../../assets/icons/list.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Profile = ({ userId }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState('');
    const [notifications, setNotifications] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(`Fetching user data from URL: ${API_URL}/user/${userId}`)
                const response = await axios.get(`${API_URL}/user/${userId}`);
                const user = response.data;
                console.log({ response })

                if (user) {
                    setUserName(user.first_name);
                    setUserEmail(user.email);
                    setUserImage(user.image);
                } else {
                    setUserName('User not found');
                    setUserEmail('');
                    setUserImage('');
                }
            } catch (err) {
                console.error('Error fetching user data:', err)
            }
        };
        fetchUserData();
    }, [API_URL]);

    const handleRequestClick = async (requestType) => {
        setSelectedRequest(requestType);
        try {
            const endpoint = requestType === 'borrow-requests'
                ? `${API_URL}/borrow-requests/lender/${userId}`
                : `${API_URL}/pending/${userId}`;
            const response = await axios.get(endpoint);
            console.log('Fetched notifications:', response.data);
            setNotifications(response.data);
        } catch (err) {
            console.error(`Error fetching ${requestType}:`, err);
            setNotifications([]);
        }
    };

    return (
        <main className='profile'>
            <div className='profile__top'>
                <div className='profile__header'>
                    <h1 className='profile__title'>Profile</h1>
                    <EditButton />
                </div>
                <div className='profile__avatar'>
                    {userImage && <img className='profile__avatar' src={`${API_URL}/uploads/users/${userImage}`} alt={`${userName}'s avatar`} />}
                </div>
                <h2 className='profile__subtitle'>Welcome back, {userName}!</h2>
                <p className='profile__email'>{userEmail}</p>
            </div>
            <div className='profile__nav'>
                <Link to={`/users/${userId}/items`}>
                    <img className='profile__icons' src={listIcon} alt='list items' />
                </Link>
                <Link to={`/users/${userId}/lent-out`}>
                    <img className='profile__icons' src={uploadIcon} alt='lent out items' />
                </Link>
                <Link to={`/users/${userId}/borrowed`}>
                    <img className='profile__icons' src={downloadIcon} alt='borrowed items' />
                </Link>
                <Link to={`/users/${userId}/archived`}>
                    <img className='profile__icons' src={archiveIcon} alt='archived items' />
                </Link>
            </div>
            <div className='profile__requests'>
                <button
                    className={`profile__request ${selectedRequest === 'borrow-requests' ? 'profile__request--selected' : ''}`}
                    onClick={() => handleRequestClick('borrow-requests')}
                >
                    Borrow Requests
                </button>
                <button
                    className={`profile__request ${selectedRequest === 'friend-requests' ? 'profile__request--selected' : ''}`}
                    onClick={() => handleRequestClick('friend-requests')}
                >
                    Friend Requests
                </button>
            </div>
            <div className='profile__notifications'>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="profile__notification">
                            {notification.item_image && <img src={`${API_URL}/uploads/${notification.item_image}`} alt={`${notification.item_name}`} />}
                            <p>{notification.item_name ? notification.item_name : 'Item name not available'}</p>
                            <p>Borrower: {notification.borrower_first_name ? notification.borrower_first_name : 'Unknown'} {notification.borrower_last_name || ''}</p>
                            <p>Requested on: {notification.created_at ? new Date(notification.created_at).toLocaleDateString() : 'Date not available'}</p>
                        </div>
                    ))
                ) : (
                    <p>No notifications</p>
                )}
            </div>
        </main>
    );
};

export default Profile;