import './DeleteModal.scss';
import CancelButton from '../CancelButton/CancelButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import closeIcon from '../../assets/icons/cancel.svg';

const DeleteModal = ({ name, onClose, onConfirmDelete, isActive, navigateTo }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <main className='delete'>
            <div className='delete__container'>
                <img
                    src={closeIcon}
                    alt="Close"
                    className='delete__close-icon'
                    onClick={() => {
                        onClose();
                        navigate(navigateTo);
                    }}
                />
                <div className='delete__content'>
                    <h1 className='delete__title'>
                        Delete {name}?
                    </h1>
                    <p className='delete__body'>
                        Please confirm that you’d like to delete {name}. You won’t be able to undo this action.
                    </p>
                </div>
                <div className='delete__buttons'>
                    <CancelButton onClose={onClose} to={navigateTo} />
                    <button onClick={onConfirmDelete} className='delete__button'>DELETE</button>
                </div>
            </div>
        </main>
    );
};

export default DeleteModal;