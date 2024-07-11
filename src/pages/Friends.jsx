import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import FriendList from '../components/FriendList/FriendList';
import Footer from '../components/Footer/Footer';

const Friends = () => {
    const { userId } = useParams();
    return (
        <>
            <Header />
            <FriendList userId={userId} />
            <Footer />
        </>
    );
};

export default Friends;