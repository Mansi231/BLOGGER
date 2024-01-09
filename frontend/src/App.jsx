import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.component'
import { Routes, Route } from "react-router-dom"
import { ROUTES } from './services/routes'
import UserAuthForm from './pages/userAuthForm.page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<Navbar />} path={ROUTES.HOME}>
        <Route element={<UserAuthForm type={'sign-in'}/>} path={ROUTES.SIGN_IN} />
        <Route element={<UserAuthForm type={'sign-up'}/>} path={ROUTES.SIGN_UP} />
      </Route>
    </Routes>
  )
}

export default App
