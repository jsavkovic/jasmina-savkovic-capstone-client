import './CancelButton.scss';
import { useNavigate } from 'react-router-dom';

const CancelButton = ({ onClose, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClose) onClose();
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button className='cancel-button' onClick={handleClick}>
            CANCEL
        </button>
    );
};

export default CancelButton;
