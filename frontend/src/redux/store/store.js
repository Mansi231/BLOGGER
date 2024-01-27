import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import blogSlice from '../slices/blogSlice'
import commentSlice from '../slices/commentSlice'

export const store = configureStore({
    reducer: { auth: authSlice, blog: blogSlice ,comment :commentSlice}
})