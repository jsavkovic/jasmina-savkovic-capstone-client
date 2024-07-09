import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from './pages/ItemsPage';
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ItemDetailsPage from './pages/ItemDetailsPage';
import Friends from './pages/Friends'
import FriendRequests from './pages/FriendRequests';
import BorrowRequests from './pages/BorrowRequests';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/users/:userId/items' element={<ItemsPage />} />

        <Route path='/items/:itemId' element={<ItemDetailsPage />} />

        <Route path='/friends' element={<Friends />} />
        <Route path='/friend-requests' element={<FriendRequests />} />

        <Route path='/borrow-request' element={<BorrowRequests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
