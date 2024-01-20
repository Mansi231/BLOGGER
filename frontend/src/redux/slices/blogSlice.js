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

export const getLatestBlogs = createAsyncThunk('getLatestBlogs', async ({ toast }) => {
    return client.get(`blog/latest-blog`).then((res) => res.data.data).catch(error => {return error })
})

export const getTrendingBlogs = createAsyncThunk('getTrendingBlogs', async ({ toast }) => {
    return client.get(`blog/trending-blog`).then((res) => res.data.data).catch(error => {return error })
})

export const getSearchBlogsByCategory = createAsyncThunk('getSearchBlogsByCategory', async (tag) => {
    return client.post(`blog/search-blogs`,tag).then((res) => res.data.data).catch(error => {return error })
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState: { latestBlogs: [],isError:null , trendingBlogs:[] ,searchBlogs:[]},
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
    }
})

export default blogSlice.reducer