import './Header.scss'
import userIcon from '../../assets/icons/user.svg';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';


const Header = () => {
    return (
        <header className="header">
            <div className="header__main">
                <NavLink to={`/items`} className='header__title--link'>
                    <p className="header__title">Lendaroo</p>
                </NavLink>
                <div className="header__profile-link">
                    <NavLink to={`/`}>
                        <img src={userIcon} alt="profile" className="header__profile-image" />
                    </NavLink>
                </div>
            </div>
            <div className='header__nav-container'>
                <NavBar />
            </div>
        </header>
    );
};

export default Header;