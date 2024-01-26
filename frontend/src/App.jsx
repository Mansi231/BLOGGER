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
import SearchPage from './pages/search.page'
import PageNotFound from './pages/404.page'
import ProfilePage from './pages/profile.page'
import BlogPage from './pages/blog.page'

function App() {

  return (
    <UserAuthContext>
      <Routes>
        <Route path={ROUTES.EDITOR} element={<Protected Component={<Editor />} />} />
        <Route path={ROUTES.EDITOR_BLOG} element={<Protected Component={<Editor />} />} />
        <Route element={<Navbar />} path={ROUTES.HOME}>
          <Route element={<HomePage />} index />
          <Route element={<Protected Component={<UserAuthForm type={'sign-in'} />} />} path={ROUTES.SIGN_IN} />
          <Route element={<Protected Component={<UserAuthForm type={'sign-up'} />} />} path={ROUTES.SIGN_UP} />
          <Route element={<SearchPage />} path={ROUTES.SEARCH} />
          <Route element={<ProfilePage />} path={ROUTES.USER} />
          <Route element={<BlogPage />} path={ROUTES.BLOG} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserAuthContext>
  )
}

export default App
