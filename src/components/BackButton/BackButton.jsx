import backIcon from '../../assets/icons/back.svg'
import { useNavigate } from 'react-router-dom';
import './BackButton.scss'

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Back" className="back-button__icon" />
        </button>
    );
};

export default BackButton;