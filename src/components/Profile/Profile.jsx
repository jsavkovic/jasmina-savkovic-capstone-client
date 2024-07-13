import './Profile.scss';
import { useUser } from '../../context/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import archiveIcon from '../../assets/icons/archive.svg';
import uploadIcon from '../../assets/icons/upload.svg';
import downloadIcon from '../../assets/icons/download.svg';
import listIcon from '../../assets/icons/list.svg';
import BorrowRequests from '../../components/BorrowRequests/BorrowRequests';
import FriendRequests from '../../components/FriendRequests/FriendRequests';


const Profile = () => {
    const { userId } = useUser();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState('');
    // const [notifications, setNotifications] = useState([]);
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

    // const handleRequestClick = async (requestType) => {
    //     setSelectedRequest(requestType);
    //     try {
    //         const endpoint = requestType === 'borrow-requests'
    //             ? `${API_URL}/borrow-requests/lender/${userId}`
    //             : `${API_URL}/pending/${userId}`;
    //         const response = await axios.get(endpoint);
    //         console.log('Fetched notifications:', response.data);
    //         setNotifications(response.data);
    //     } catch (err) {
    //         console.error(`Error fetching ${requestType}:`, err);
    //         setNotifications([]);
    //     }
    // };

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
                <Link to={`/users/${userId}/loaned`}>
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
                    onClick={() => setSelectedRequest('borrow-requests')}
                >
                    Borrow Requests
                </button>
                <button
                    className={`profile__request ${selectedRequest === 'friend-requests' ? 'profile__request--selected' : ''}`}
                    onClick={() => setSelectedRequest('friend-requests')}
                >
                    Friend Requests
                </button>
            </div>
            <div className='profile__notifications'>
                {selectedRequest === 'borrow-requests' && <BorrowRequests userId={userId} />}
                {selectedRequest === 'friend-requests' && <FriendRequests userId={userId} />}
            </div>
        </main>
    );
};

export default Profile;