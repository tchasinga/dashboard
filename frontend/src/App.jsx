import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import SignIn from './Components/SignIn'
import PrivateRoom from './Pages/PrivateRoom'

function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
    
      <Route element={<PrivateRoom/>}>
        <Route path="/dashborad" element={<Dashboard />} />
      </Route>
    </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
