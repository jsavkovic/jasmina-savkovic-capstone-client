import './ItemsList.scss';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';

const ItemsList = ({
    items,
    error,
    userName,
    friendId,
    itemTypes,
    onFilterChange
}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <section className="items-list">
            <div className="items-list__header">
                <h1 className="items-list__title">
                    {friendId ? `${userName}'s Items` : 'My Items'}
                </h1>
                {itemTypes.length > 0 && (
                    <Filter itemTypes={itemTypes} onFilterChange={onFilterChange} />
                )}
            </div>
            <div className='items-list__button-row'>
                {!friendId && (
                    <Link to="/upload" className="items-list__add-button">
                        Add New Item
                    </Link>
                )}
            </div>
            <div className="items-list__grid">
                {error && <p className="items-list__error">{error}</p>}
                {items.length > 0 ? (
                    items.map(item => (
                        <article key={item.id} className="items-list__item">
                            <Link to={`/items/${item.id}`}>
                                <div className='items-list__image'>
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} />
                                </div>
                                <h3 className="items-list__name">{item.name}</h3>
                            </Link>
                        </article>
                    ))
                ) : (
                    <p className="items-list__error">No items found.</p>
                )}
            </div>
        </section>
    );
};

export default ItemsList;
