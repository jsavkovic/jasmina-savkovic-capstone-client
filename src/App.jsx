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
import LentOutItems from './components/LentOutItems/LentOutItems';
import BorrowedItems from './components/BorrowedItems/BorrowedItems';
import ArchivedItems from './components/ArchivedItems/ArchivedItems';
import Notifications from './pages/Notifications';
import { UserProvider } from './context/UserContext';

function App() {
  const userId = 2; // replace with login user id

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='users/:userId/profile' element={<ProfilePage />} />
          <Route path='/users/:userId/items' element={<ItemsPage />} />
          <Route path='/users/:userId/lent-out' element={<LentOutItems />} />
          <Route path='/users/:userId/borrowed' element={<BorrowedItems />} />
          <Route path='/users/:userId/archived' element={<ArchivedItems />} />

          <Route path='/users/:userId/upload' element={<UploadPage />} />

          <Route path='/items/:itemId' element={<ItemDetailsPage />} />
          <Route path='/items/:itemId/edit' element={<EditPage />} />

          <Route path='/users/:userId/friends' element={<Friends />} />
          <Route path='/users/:userId/notifications' element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
