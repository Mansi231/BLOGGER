import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../services/client'
import { storeInSession } from '../../common/session';
import { KEYS } from '../../services/key';

export const showErr = (toast, err, id) => {
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
        showErr(toast, err, 'authError')
    })
})

export const userGoogeAuth = createAsyncThunk('userGoogleAuth', async ({ token, setUserAuthDetail, toast }) => {
    return client.post(`user/google-auth`, { access_token: token }).then((res) => {
        storeInSession(KEYS.USER, JSON.stringify(res?.data));
        setUserAuthDetail(res?.data);
        return res.data
    }).catch((err) => {
        showErr(toast, err, 'googleAuthError')
    })
})

// image upload url 

export const getImageUploadUrl = createAsyncThunk('getImageUploadUrl', async ({ toast, formData }) => {

    return client.post(`/get-upload-url`, formData).then(async (res) => {
        return res.data?.imageUrl
    }).catch((err) => {
        if (err?.response?.data?.error) {
            toast.error(err?.response?.data?.error, { duration: 3000, id: 'imageUploadError' })
        }
        throw new Error(err?.response?.data?.error)
    })
})


// reducer slice 

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isLoading: false,
        isError: null,

        imageUrl: null,
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
            .addCase(getImageUploadUrl.pending, (state, action) => {
            })
            .addCase(getImageUploadUrl.fulfilled, (state, action) => {
                state.imageUrl = action.payload;
            })
            .addCase(getImageUploadUrl.rejected, (state, action) => {})
    }
})

export default authSlice.reducer