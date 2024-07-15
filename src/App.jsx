import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemsPage from './pages/ItemsPage';
import Register from './pages/Register'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import ItemDetailsPage from './pages/ItemDetailsPage';
import Friends from './pages/Friends'
import EditPage from './pages/EditPage';
import UploadPage from './pages/UploadPage';
import LoanedItemsPage from './pages/LoanedItemsPage';
import BorrowedItemsPage from './pages/BorrowedItemsPage';
import { UserProvider } from './context/UserContext';
import { Container } from '@mui/material';

function App() {

  return (
    <Container maxWidth='lg' sx={{
      bgcolor: 'white',
      paddingLeft: { xs: 0, sm: 0, md: 0 },
      paddingRight: { xs: 0, sm: 0, md: 0 },
    }}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProfilePage />} />
            <Route path='/items' element={<ItemsPage />} />
            <Route path='/loaned' element={<LoanedItemsPage />} />
            <Route path='/borrowed' element={<BorrowedItemsPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/items/:itemId' element={<ItemDetailsPage />} />
            <Route path='/items/:itemId/edit' element={<EditPage />} />
            <Route path='/friends' element={<Friends />} />
            <Route path="/:friendId/items" element={<ItemsPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Container>
  )
}

export default App
