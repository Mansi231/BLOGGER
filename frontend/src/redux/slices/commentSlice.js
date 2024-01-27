import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/client";
import { showErr } from "./authSlice";

export const addComment = createAsyncThunk('addComment', async ({ commentObj ,toast}) => {
    return client.post(`comment/add-comment`, commentObj).then((res) => {
        console.log(res,'---res---comment---');
        return res.data
    }).catch(err => {
        showErr(toast, err, 'addCommentErr')
    })
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {comment:{}},
    extraReducers: (builder) => {
        builder.addCase(addComment.fulfilled,(state,action)=>{state.comment = action.payload})
    }
})

export default commentSlice.reducer