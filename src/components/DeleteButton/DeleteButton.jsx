import deleteIcon from '../../assets/icons/delete.svg';
import './DeleteButton.scss';

const DeleteButton = ({ onClick }) => {
    return (
        <img
            src={deleteIcon}
            alt="Delete"
            className="delete-button"
            onClick={onClick}
        />
    );
};

export default DeleteButton;