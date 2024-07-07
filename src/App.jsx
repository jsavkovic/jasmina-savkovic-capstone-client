import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/lend' element={<LendList />} />
        <Route path='/lend/:itemId' element={<ItemDetails />} />
        <Route path='/gift' element={<GiftList />} />
        <Route path='/gift/:itemId' element={<ItemDetails />} />
        <Route path='/friends' element={<FriendList />} />
        <Route path='/friend-requests' element={<FriendRequestList />} />
        <Route path='/borrow-request' element={<BorrowRequestList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
