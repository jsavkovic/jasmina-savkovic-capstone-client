import './Header.scss'
import userIcon from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';

import React from 'react';

const Header = () => {
    const userId = 1;

    return (
        <header className="header">
            <div className="header__main">
                <Link to={`/users/${userId}/items`} className='header__title--link'>
                    <p className="header__title">lendaroo</p>
                </Link>
                <div className="header__profile-link">
                    <Link to={`/users/${userId}/profile`}>
                        <img src={userIcon} alt="profile" className="header__profile-image" />
                    </Link>
                </div>
            </div>
            <div className="header__secondary">
                <input type="text" placeholder="Search..." className="header__search" />
                <button className="header__search-button">FIND</button>
            </div>
        </header>
    );
};

export default Header;