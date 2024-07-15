import './Profile.scss';
import { useUser } from '../../context/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditButton from '../EditButton/EditButton';


const Profile = () => {
    const { userId } = useUser();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUserImage] = useState('');
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
        </main>
    );
};

export default Profile;