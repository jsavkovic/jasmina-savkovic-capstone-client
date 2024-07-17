import './CancelButton.scss';
import { useNavigate } from 'react-router-dom';

const CancelButton = ({ onClick, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
        if (navigateTo !== undefined) {
            navigate(navigateTo);
        }
    };

    return (
        <button className='cancel-button' onClick={handleClick}>
            CANCEL
        </button>
    );
};

export default CancelButton;
