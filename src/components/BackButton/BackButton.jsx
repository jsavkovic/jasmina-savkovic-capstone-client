import backIcon from '../../assets/icons/back.svg'
import { useNavigate } from 'react-router-dom'
import './BackButton.scss'

const BackButton = ({ to }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (to === -1) {
            navigate(-1)
        } else {
            navigate(to)
        }
    }

    return (
        <button className='back-button' onClick={handleClick}>
            <img src={backIcon} alt='Back' className='back-button__icon' />
        </button>
    )
}

export default BackButton
