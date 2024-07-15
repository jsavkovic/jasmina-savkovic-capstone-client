import { Divider } from '@mui/material'
import './ArchivedItems.scss'
import { Link } from 'react-router-dom'

const ArchivedItems = ({ items, API_URL }) => {
    return (
        <section className='archived'>
            <Divider />
            <h2 className='archived__subtitle'>Archived Items</h2>
            <div className='archived__grid'>
                {items.length > 0 &&
                    items.map(item => (
                        <article key={item.id} className='archived__item'>
                            <Link to={`/items/${item.id}`}>
                                <img
                                    src={`${API_URL}/uploads/${item.image}`}
                                    alt={item.name}
                                    className='archived__image'
                                />
                                <h3 className='archived__name'>{item.name}</h3>
                            </Link>
                        </article>
                    ))}
            </div>
        </section>
    )
}

export default ArchivedItems
