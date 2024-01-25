import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../services/client"
import { showErr } from "./authSlice"

export const createBlog = createAsyncThunk('createBlog', async ({ blogObj, toast, navigate }) => {
    return client.post(`blog/create-blog`, blogObj).then((res) => {
        handlePublishRes()

        return res.data
    }).catch(err => {
        showErr(toast, err, 'createBlogErr')
    })
})

export const getLatestBlogs = createAsyncThunk('getLatestBlogs', async ({ toast ,page}) => {
    return client.post(`blog/latest-blog`,{page}).then((res) => res.data).catch(error => {return error })
})

export const getTrendingBlogs = createAsyncThunk('getTrendingBlogs', async ({ toast }) => {
    return client.get(`blog/trending-blog`).then((res) => res.data.data).catch(error => {return error })
})

export const getSearchBlogsByCategory = createAsyncThunk('getSearchBlogsByCategory', async (tag) => {
    return client.post(`blog/search-blogs`,tag).then((res) => res.data).catch(error => {return error })
})

export const getSearchUsers = createAsyncThunk('getSearchUsers', async (query) => {
    return client.post(`blog/search-users`,query).then((res) => res.data.data).catch(error => {return error })
})

export const getUserProfile = createAsyncThunk('getUserProfile', async (username) => {
    return client.post(`blog/get-profile`,username).then((res) => res.data.data).catch(error => {return error })
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState: { latestBlogs: {},isError:null , trendingBlogs:[] ,searchBlogs:{},users:[],userProfile:{}},
    extraReducers: (builder) => {
        builder.addCase(getLatestBlogs.pending, (state, action) => {})
        .addCase(getLatestBlogs.fulfilled, (state, action) => {
            state.latestBlogs = action.payload
        })
        .addCase(getLatestBlogs.rejected, (state, action) => {
            state.isError = action.payload
        })
        .addCase(getTrendingBlogs.fulfilled, (state, action) => {
          
            state.trendingBlogs = action.payload
        })
        .addCase(getSearchBlogsByCategory.fulfilled, (state, action) => {
          
            state.searchBlogs = action.payload
        })
        .addCase(getSearchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
        })
    }
})

export default blogSlice.reducer