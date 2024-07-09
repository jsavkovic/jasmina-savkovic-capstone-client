import './CancelButton.scss'
import { useNavigate } from 'react-router-dom';

const CancelButton = ({ to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button className='cancel-button' onClick={handleClick}>
            CANCEL
        </button>
    );
};

export default CancelButton;