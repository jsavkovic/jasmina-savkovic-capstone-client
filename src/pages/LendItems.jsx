import { useParams } from 'react-router-dom';
import ItemsList from '../components/ItemsList/ItemsList'
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import './LendItems.scss'

const LendItems = () => {
    const { userId } = useParams();
    const category = 'lend';

    return (
        <main>
            <Header />
            <div className='lend-items__header'>
                <h1>Lend Items</h1>
                <Filter />
            </div>
            <ItemsList userId={userId} category={category} />
        </main>
    );
};

export default LendItems;