import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.component'
import { Routes, Route } from "react-router-dom"
import { ROUTES } from './services/routes'
import UserAuthForm from './pages/userAuthForm.page'
import UserAuthContext from './context/userAuth.context'
import Protected from './protected/protected'
import Editor from './pages/editor.page'
import HomePage from './pages/home.page'

function App() {

  return (
    <UserAuthContext>
      <Routes>
        <Route path={ROUTES.EDITOR} element={<Protected Component={<Editor/>}/>}/>
        <Route element={<Protected Component={<Navbar />}/>} path={ROUTES.HOME}>
          <Route element={<Protected Component={<HomePage/>}/>} index />
          <Route element={<Protected Component={<UserAuthForm type={'sign-in'} />}/>} path={ROUTES.SIGN_IN} />
          <Route element={<Protected Component={<UserAuthForm type={'sign-up'} />}/>} path={ROUTES.SIGN_UP} />
        </Route>
      </Routes>
    </UserAuthContext>
  )
}

export default App
