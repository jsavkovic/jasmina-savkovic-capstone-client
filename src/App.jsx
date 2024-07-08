import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LendItems from './pages/LendItems';
import GiftItems from './pages/GiftItems';
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LendItemDetails from './pages/LendItemDetails';
import GiftItemDetails from './pages/GiftItemDetails';
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
        <Route path='/:userId/lend' element={<LendItems />} />
        <Route path='/lend/:itemId' element={<LendItemDetails />} />
        <Route path='/:userId/gift' element={<GiftItems />} />
        <Route path='/gift/:itemId' element={<GiftItemDetails />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/friend-requests' element={<FriendRequests />} />
        <Route path='/borrow-request' element={<BorrowRequests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
