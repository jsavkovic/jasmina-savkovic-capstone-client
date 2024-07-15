import { useUser } from '../context/UserContext';
import Header from '../components/Header/Header';
import FriendList from '../components/FriendList/FriendList';
import Footer from '../components/Footer/Footer';

const Friends = () => {
    const { userId } = useUser();
    return (
        <>
            <Header />
            <FriendList userId={userId} />
            <Footer />
        </>
    );
};

export default Friends;