import { useParams } from 'react-router-dom';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
    const { userId } = useParams();
    return (
        <div>
            <Header />
            <Profile userId={userId} />
            <Footer />
        </div>
    );
};

export default ProfilePage;