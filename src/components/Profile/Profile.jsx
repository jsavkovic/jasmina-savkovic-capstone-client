import './Profile.scss';
import EditButton from '../EditButton/EditButton';
import archiveIcon from '../../assets/icons/archive.svg';
import uploadIcon from '../../assets/icons/upload.svg';
import downloadIcon from '../../assets/icons/download.svg';
import listIcon from '../../assets/icons/list.svg';


const Profile = () => {
    return (
        <main className='profile'>
            <div className='profile__top'>
                <div className='profile__header'>
                    <h1 className='profile__title'>Profile</h1>
                    <EditButton />
                </div>
                <div className='profile__avatar'></div>
                {/* dynamically render user first name */}
                <h2 className='profile__subtitle'>Welcome back User!</h2>
                <p className='profile__email'>Pull in user email address</p>
            </div>
            <div className='profile__nav'>
                <img className='profile__icons' src={listIcon} alt='list items' />
                <img className='profile__icons' src={uploadIcon} alt='lent out items' />
                <img className='profile__icons' src={downloadIcon} alt='borrowed items' />
                <img className='profile__icons' src={archiveIcon} alt='archived items' />
            </div>
            <div className='profile__requests'>
                <p className='profile__borrow'>borrow requests</p>
                <p className='profile__friend'>friend requests</p>
            </div>
            <div className='profile__history'>
                <p>borrowed item 1 for 5 days june 10</p>
                <p>or maybe some other type of information, calendar?, placeholder for msgs</p>
            </div>
        </main>
    );
};

export default Profile;