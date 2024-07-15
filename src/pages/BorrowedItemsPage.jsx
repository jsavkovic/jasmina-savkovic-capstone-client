import { useState } from 'react';
import BorrowedItems from '../components/BorrowedItems/BorrowedItems';
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
            <BorrowedItems />
            <Footer />
        </main>
    );
};

export default BorrowedItemsPage;
