import { useUser } from "../context/UserContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
    const { userId } = useUser();

    return (
        <div>
            <Header />
            <Profile userId={userId} />
            <Footer />
        </div>
    );
};

export default ProfilePage;