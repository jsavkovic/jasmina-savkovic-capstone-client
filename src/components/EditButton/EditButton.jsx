import editIcon from '../../assets/icons/edit.svg';
import './EditButton.scss';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className='edit-button' onClick={handleClick}>
            <img src={editIcon} alt='Edit' className='edit-button__icon' />
        </button>
    );
};

export default EditButton;