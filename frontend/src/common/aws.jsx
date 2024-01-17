import { getImageUploadUrl } from '../redux/slices/authSlice';
import { store } from '../redux/store/store';
import { client } from '../services/client';

const UploadImage = async (formData, toast) => {

    let imageUrl = null

    let action = await store.dispatch(getImageUploadUrl({ toast, formData }))
    if(typeof action.payload === 'string')imageUrl = action.payload

    return imageUrl
}

export { UploadImage }