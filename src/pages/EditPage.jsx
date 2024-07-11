import { useUser } from '../context/UserContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import EditItemForm from '../components/EditItemForm/EditItemForm';

const EditPage = () => {
    const { userId } = useUser();
    return (
        <main>
            <Header />
            <EditItemForm userId={userId} />
            <Footer />
        </main>
    );
};

export default EditPage;