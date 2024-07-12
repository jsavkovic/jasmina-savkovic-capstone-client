import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsList from '../components/ItemsList/ItemsList';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './ItemsPage.scss';
import { useUser } from '../context/UserContext';

const ItemsPage = () => {
    const { userId: selectedUserId } = useParams();
    const { userId: loggedInUserId } = useUser();

    return (
        <>

            <main>
                <Header />
                <ItemsList selectedUserId={selectedUserId} loggedInUserId={loggedInUserId} />
                <Footer />
            </main>

        </>
    );
};

export default ItemsPage;
