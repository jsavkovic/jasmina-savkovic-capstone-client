import editIcon from '../../assets/icons/edit.svg';
import './EditButton.scss';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ to }) => {
    const navigate = useNavigate();

    return (
        <button className='edit-button' onClick={() => navigate(to)}>
            <img src={editIcon} alt='Edit' className='edit-button__icon' />
        </button>
    );
};

export default EditButton;