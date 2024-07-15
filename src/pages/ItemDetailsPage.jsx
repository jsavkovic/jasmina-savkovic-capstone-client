import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetailsPage = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                console.log(`Fetching item details for ID: ${itemId}`);
                const response = await axios.get(`${API_URL}/items/${itemId}`);
                console.log('Item details fetched:', response.data);
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching item details:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [itemId, API_URL]);

    const refreshItems = async () => {
        console.log("Refreshing items list");
        navigate(`/users/${item.user_id}/items`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <Header />
            <ItemDetails item={item} refreshItems={refreshItems} />
            <Footer />
        </main>
    );
};

export default ItemDetailsPage;
