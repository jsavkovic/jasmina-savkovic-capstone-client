import deleteIcon from '../../assets/icons/delete.svg';
import './DeleteButton.scss';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className='delete-button' onClick={handleClick}>
            <img src={deleteIcon} alt='Delete' className='delete-button__icon' />
        </button>
    );
};

export default DeleteButton;