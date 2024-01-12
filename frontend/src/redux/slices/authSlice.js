import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../services/client'
import { storeInSession } from '../../common/session';
import { KEYS } from '../../services/key';

const showErr = (toast,err,id)=>{
    if (err?.response?.data?.error) toast.error(err?.response?.data?.error, { duration: 3000, id })
    throw new Error(err?.response?.data?.error)
}


// AUTH signin-login-google

export const userAuth = createAsyncThunk('userAuth', async ({ values, route, toast, setUserAuthDetail }) => {
    return client.post(`user/${route}`, values).then((res) => {
        storeInSession(KEYS.USER, JSON.stringify(res?.data));
        setUserAuthDetail(res?.data);
        return res.data
    }).catch((err) => {
        showErr(toast,err,'authError')
        // if (err?.response?.data?.error) toast.error(err?.response?.data?.error, { duration: 3000, id: 'authError' })
        // throw new Error(err?.response?.data?.error)
    })
})

export const userGoogeAuth = createAsyncThunk('userGoogleAuth',async ({token,setUserAuthDetail,toast}) =>{
    return client.post(`user/google-auth`,{access_token:token}).then((res) => {
        storeInSession(KEYS.USER, JSON.stringify(res?.data));
        setUserAuthDetail(res?.data);
        return res.data
    }).catch((err) => {
        showErr(toast,err,'googleAuthError')
        // if (err?.response?.data?.error) toast.error(err?.response?.data?.error, { duration: 3000, id: 'googleAuthError' })
        // throw new Error(err?.response?.data?.error)
    })
})

// image upload url 

export const getImageUploadUrl = createAsyncThunk('getImageUploadUrl',async (toast)=>{
    return client.get(`/get-uload-url`).then((res)=>res.data).catch((err)=>{
        showErr(toast,err,'imageUploadErr')
        // if (err?.response?.data?.error) toast.error(err?.response?.data?.error, { duration: 3000, id: 'googleAuthError' })
        // throw new Error(err?.response?.data?.error)
    })
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isLoading: false,
        isError: null
    },
    extraReducers: (builder) => {
        builder.
            addCase(userAuth.pending, (state) => { state.isLoading = true })
            .addCase(userAuth.fulfilled, (state, action) => {
                state.user = action?.payload; state.isLoading = false
            })
            .addCase(userAuth.rejected, (state, action) => {
                state.isError = action?.payload; state.isLoading = false
            })
    }
})

export default authSlice.reducer