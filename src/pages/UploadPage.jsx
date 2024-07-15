import { useUser } from '../context/UserContext'
import Header from "../components/Header/Header";
import UploadItemForm from "../components/UploadItemForm/UploadItemForm";
import Footer from '../components/Footer/Footer';

const UploadPage = () => {
  const { userId } = useUser();
  return (
    <>
      <Header />
      <UploadItemForm userId={userId} />
      <Footer />
    </>
  );
};

export default UploadPage;