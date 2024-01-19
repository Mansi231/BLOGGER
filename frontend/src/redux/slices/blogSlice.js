import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../services/client"
import { showErr } from "./authSlice"
import { ROUTES } from "../../services/routes"

export const createBlog = createAsyncThunk('createBlog', async ({ blogObj, toast ,navigate}) => {
    return client.post(`blog/create-blog`, blogObj).then((res) => {
        handlePublishRes()
       
        return res.data
    }).catch(err => {
        showErr(toast, err, 'createBlogErr')
    })
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase()
    }
})