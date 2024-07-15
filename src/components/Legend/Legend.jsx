import './Legend.scss';

const Legend = () => {
    return (
        <div className="legend">
            <h3 className="legend__title">Legend</h3>
            <ul className="legend__list">
                <li className="legend__item legend__item--pickup">
                    <span className="legend__color legend__color--pickup"></span>
                    <span className="legend__text">Accepted request</span>
                </li>
                <li className="legend__item legend__item--soon">
                    <span className="legend__color legend__color--soon"></span>
                    <span className="legend__text">Due in 1-2 days</span>
                </li>
                <li className="legend__item legend__item--today">
                    <span className="legend__color legend__color--today"></span>
                    <span className="legend__text">Due today</span>
                </li>
                <li className="legend__item legend__item--overdue">
                    <span className="legend__color legend__color--overdue"></span>
                    <span className="legend__text">Overdue</span>
                </li>
            </ul>
        </div>
    );
};

export default Legend;
