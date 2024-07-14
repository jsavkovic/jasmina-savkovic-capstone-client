import { useState } from 'react';
import BorrowedItems from '../components/BorrowedItems/BorrowedItems';
import BorrowRequests from '../components/BorrowRequests/BorrowRequests';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './BorrowedItemsPage.scss';


const BorrowedItemsPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('loan-requests');

    const handleComponentChange = (component) => {
        setSelectedComponent(component);
    };

    return (
        <main>
            <Header />
            <div className="switch-container">
                <button
                    className={`switch-container__switch-button ${selectedComponent === 'loan-requests' ? 'switch-container__switch-button--selected' : ''}`}
                    onClick={() => handleComponentChange('loan-requests')}
                >
                    Loan Requests
                </button>
                <button
                    className={`switch-container__switch-button ${selectedComponent === 'borrowed-items' ? 'switch-container__switch-button--selected' : ''}`}
                    onClick={() => handleComponentChange('borrowed-items')}
                >
                    Borrowed Items
                </button>
            </div>
            {selectedComponent === 'loan-requests' ? (
                <BorrowRequests />
            ) : (
                <BorrowedItems />
            )}
            <Footer />
        </main>
    );
};

export default BorrowedItemsPage;
