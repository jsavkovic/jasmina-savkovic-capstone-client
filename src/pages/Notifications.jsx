import { useUser } from '../context/UserContext';
import Header from '../components/Header/Header';
import BorrowRequests from '../components/BorrowRequests/BorrowRequests';
import FriendRequests from '../components/FriendRequests/FriendRequests';
import Footer from '../components/Footer/Footer';

const Notifications = () => {
    const { userId } = useUser();

    return (
        <>
            <Header />
            <BorrowRequests userId={userId} />
            <FriendRequests userId={userId} />
            <Footer />
        </>
    );
};

export default Notifications;