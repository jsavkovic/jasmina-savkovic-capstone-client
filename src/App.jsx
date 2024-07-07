import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Items from './pages/Items';
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ItemDetails from './pages/ItemDetails';
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
        <Route path='/lend' element={<Items />} />
        <Route path='/lend/:itemId' element={<ItemDetails />} />
        <Route path='/gift' element={<Items />} />
        <Route path='/gift/:itemId' element={<ItemDetails />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/friend-requests' element={<FriendRequests />} />
        <Route path='/borrow-request' element={<BorrowRequests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
