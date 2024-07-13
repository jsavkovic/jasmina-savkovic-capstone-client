import './ArchivedItems.scss';
import { Link } from 'react-router-dom';

const ArchivedItems = ({ items, API_URL }) => {
    return (
        <section className="archived-items">
            <h2 className='archived-items__subtitle'>Archived Items</h2>
            <div className="archived-items__grid">
                {items.length > 0 && items.map(item => (
                    <article key={item.id} className="archived-items__item">
                        <Link to={`/items/${item.id}`}>
                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.name} className="archived-items__image" />
                            <h3 className='archived-items__name'>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ArchivedItems;
