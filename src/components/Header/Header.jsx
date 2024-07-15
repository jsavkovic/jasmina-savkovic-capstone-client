import './Header.scss'
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import userIcon from '../../assets/icons/user.svg';
import { NavLink, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const Header = () => {
    const { userId } = useUser();
    const location = useLocation();

    const paths = [
        `/items`,
        `/borrowed`,
        `/loaned`,
        `/friends`
    ];

    const currentTabIndex = paths.indexOf(location.pathname);
    const [value, setValue] = useState(currentTabIndex !== -1 ? currentTabIndex : 0);

    useEffect(() => {
        setValue(currentTabIndex !== -1 ? currentTabIndex : 0);
    }, [location.pathname, currentTabIndex]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
                className="header__tabs"

            >
                {paths.map((path, index) => (
                    <Tab
                        key={index}
                        className='header__tab'
                        label={
                            index === 0 ? "My Listings" :
                                index === 1 ? "Borrowed Items" :
                                    index === 2 ? "Loaned Items" : "Friends"
                        }
                        component={NavLink}
                        to={path}
                    />
                ))}
            </Tabs>
        </header>
    );
};

export default Header;