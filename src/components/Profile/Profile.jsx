import './Profile.scss';
import EditButton from '../EditButton/EditButton';
import archiveIcon from '../../assets/icons/archive.svg';
import uploadIcon from '../../assets/icons/upload.svg';
import downloadIcon from '../../assets/icons/download.svg';
import listIcon from '../../assets/icons/list.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = 1 // replace with logged in user prop when log in is set up
                console.log(`Fetching user data from URL: ${API_URL}/user/${userId}`)
                const response = await axios.get(`${API_URL}/user/${userId}`);
                const user = response.data;

                if (user) {
                    setUserName(user.first_name);
                    setUserEmail(user.email);
                } else {
                    setUserName('User not found');
                    setUserEmail('');
                }
            } catch (err) {
                console.error('Error fetching user data:', err)
            }
        };
        fetchUserData();
    }, [API_URL]);

    return (
        <main className='profile'>
            <div className='profile__top'>
                <div className='profile__header'>
                    <h1 className='profile__title'>Profile</h1>
                    <EditButton />
                </div>
                <div className='profile__avatar'></div>
                {/* dynamically render user first name */}
                <h2 className='profile__subtitle'>Welcome back {userName}!</h2>
                <p className='profile__email'>{userEmail}</p>
            </div>
            <div className='profile__nav'>
                <img className='profile__icons' src={listIcon} alt='list items' />
                <img className='profile__icons' src={uploadIcon} alt='lent out items' />
                <img className='profile__icons' src={downloadIcon} alt='borrowed items' />
                <img className='profile__icons' src={archiveIcon} alt='archived items' />
            </div>
            <div className='profile__requests'>
                <p className='profile__borrow'>borrow requests</p>
                <p className='profile__friend'>friend requests</p>
            </div>
            <div className='profile__history'>
                <p>borrowed item 1 for 5 days june 10</p>
                <p>or maybe some other type of information, calendar?, placeholder for msgs</p>
            </div>
        </main>
    );
};

export default Profile;