import { useUser } from '../context/UserContext';
import Header from '../components/Header/Header';
import FriendList from '../components/FriendList/FriendList';
import FriendRequests from '../components/FriendRequests/FriendRequests'
import Footer from '../components/Footer/Footer';

const Friends = () => {
    const { userId } = useUser();
    return (
        <>
            <Header />
            <FriendList userId={userId} />
            <FriendRequests />
            <Footer />
        </>
    );
};

export default Friends;