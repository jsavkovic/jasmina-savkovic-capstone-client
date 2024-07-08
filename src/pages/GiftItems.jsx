import ItemsList from '../components/ItemsList/ItemsList'
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';

const GiftItems = () => {
    const { userId } = useParams();
    const category = 'gift';

    return (
        <main>
            <Header />
            <h1>Gift Items</h1>
            <ItemsList userId={userId} category={category} />
        </main>
    );
};

export default GiftItems;