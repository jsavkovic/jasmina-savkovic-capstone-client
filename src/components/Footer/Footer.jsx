import './Footer.scss';
import { useUser } from '../../context/UserContext';
import notificationIcon from '../../assets/icons/notifications.svg';
import addIcon from '../../assets/icons/add_circle.svg';
import groupIcon from '../../assets/icons/group.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { userId } = useUser();

    return (
        <footer className='footer'>
            <div className='footer__section'>
                <Link to={`/users/${userId}/notifications`}>
                    <img src={notificationIcon} alt='notifications' className='footer__icon' />
                </Link>
            </div>
            <div className='footer__section'>
                <Link to={`/users/${userId}/upload`}>
                    <img src={addIcon} alt='add item' className='footer__icon' />
                </Link>
            </div>
            <div className='footer__section'>
                <Link to={`/users/${userId}/friends`}>
                    <img src={groupIcon} alt='friends link' className='footer__icon' />
                </Link>
            </div>
        </footer >
    );
};

export default Footer;