import './Header.scss'
import userIcon from '../../assets/icons/user.svg'

import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="header__main">
                <p className="header__title">Lendaroo</p>
                <div className="header__profile-link">
                    <img src={userIcon} alt="profile" className="header__profile-image" />
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