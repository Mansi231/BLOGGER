import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../services/client'
import { storeInSession } from '../../common/session';
import { KEYS } from '../../services/key';

export const userAuth = createAsyncThunk('userAuth', async ({ values, route, toast, setUserAuthDetail }) => {
    return client.post(`/user/${route}`, values).then((res) => {
        storeInSession(KEYS.USER, JSON.stringify(res?.data));
        setUserAuthDetail(res?.data);
        return res.data
    }).catch((err) => {
        if (err?.response?.data?.error) toast.error(err?.response?.data?.error, { duration: 2000, id: 'error' })
        throw new Error(err?.response?.data?.error)
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