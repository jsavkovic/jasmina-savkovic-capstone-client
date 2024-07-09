import deleteIcon from '../../assets/icons/delete.svg';
import './DeleteButton.scss';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ to }) => {
    const navigate = useNavigate();

    return (
        <button className='delete-button' onClick={() => navigate(to)}>
            <img src={deleteIcon} alt='Delete' className='delete-button__icon' />
        </button>
    );
};

export default DeleteButton;