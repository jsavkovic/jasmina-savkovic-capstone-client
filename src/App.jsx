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
            <Route path='users/:userId/profile' element={<ProfilePage />} />
            <Route path='/users/:userId/items' element={<ItemsPage />} />
            <Route path='/users/:userId/loaned' element={<LoanedItemsPage />} />
            <Route path='/users/:userId/borrowed' element={<BorrowedItemsPage />} />
            <Route path='/users/:userId/upload' element={<UploadPage />} />
            <Route path='/items/:itemId' element={<ItemDetailsPage />} />
            <Route path='/items/:itemId/edit' element={<EditPage />} />
            <Route path='/users/:userId/friends' element={<Friends />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Container>
  )
}

export default App
