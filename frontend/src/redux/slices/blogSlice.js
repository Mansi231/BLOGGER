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

export const getLatestBlogs = createAsyncThunk('getLatestBlogs', async ({ toast, page }) => {
    return client.post(`blog/latest-blog`, { page }).then((res) => res.data).catch(error => { return error })
})

export const getTrendingBlogs = createAsyncThunk('getTrendingBlogs', async ({ toast }) => {
    return client.get(`blog/trending-blog`).then((res) => res.data.data).catch(error => { return error })
})

export const getSearchBlogsByCategory = createAsyncThunk('getSearchBlogsByCategory', async (tag) => {
    return client.post(`blog/search-blogs`, tag).then((res) => res.data).catch(error => { return error })
})

export const getSearchUsers = createAsyncThunk('getSearchUsers', async (query) => {
    return client.post(`blog/search-users`, query).then((res) => res.data.data).catch(error => { return error })
})

export const getUserProfile = createAsyncThunk('getUserProfile', async (username) => {
    return client.post(`blog/get-profile`, username).then((res) => res.data.data).catch(error => { return error })
})

export const getBlog = createAsyncThunk('getBlog', async ({blog_id,toast}) => {
    return client.post(`blog/get-blog`, {blog_id}).then((res) => res.data.data).catch(error => {
        showErr(toast, error, 'getBlogErr')
        return null
    })
})

// like blog

export const likeBlog = createAsyncThunk('likeBlog', async ({obj, toast}) => {
    return client.post(`blog/like-blog`, obj).then((res) => res.data).catch(error => {
        showErr(toast, error, 'likeBlogErr')
        return null
    })
})

// is blog liked by user 

export const isBlogLikedByUser = createAsyncThunk('isBlogLikedByUser', async ({obj, toast}) => {
    return client.post(`blog/isliked-by-user`, obj).then((res) => res.data?.result
    ).catch(error => {
        showErr(toast, error, 'likeBlogErr')
        return null
    })
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState: { latestBlogs: {}, isError: null, trendingBlogs: [], searchBlogs: {}, users: [], userProfile: {}, blog: {} ,isLikedBlog:null},
    extraReducers: (builder) => {
        builder.addCase(getLatestBlogs.pending, (state, action) => { })
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
            .addCase(getBlog.fulfilled, (state, action) => {
                state.blog = action.payload
            })
            .addCase(isBlogLikedByUser.fulfilled, (state, action) => {
                state.isLikedBlog = action.payload
            })
    }
})

export default blogSlice.reducer