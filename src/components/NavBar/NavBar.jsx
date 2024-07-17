import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const paths = [
    { path: '/items', label: 'My Listings' },
    { path: '/borrowed', label: 'Borrowed Items' },
    { path: '/loaned', label: 'Loaned Items' },
    { path: '/friends', label: 'Friends' },
];

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {paths.map(({ path, label }) => (
                    <li key={path} className="navbar__item">
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                isActive ? "navbar__link navbar__link--active" : "navbar__link"
                            }
                            end
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
