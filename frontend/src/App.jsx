import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import SignIn from './Components/SignIn'
import PrivateRoom from './Pages/PrivateRoom'
import Home from './Components/Home'
import { useSelector } from 'react-redux'
import Header from './Components/Header'

function App() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={currentUser ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route element={<PrivateRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
