import axios from 'axios'
import {KEYS} from './key'

let base_url = import.meta.env?.VITE_BASE_URL

export const client = axios.create({
    baseURL:base_url,
    headers:{
        'Accept':'application/json',
        'Authorization':{
            toString(){
                let user = JSON.parse(localStorage.getItem(KEYS.USER))
                if(user)return `Bearer ${user?.access_token}`
            }
        }
    }
})

// Request interceptor to set headers based on the request type
client.interceptors.request.use((config) => {
    // Assuming you have a way to determine the request type
    // For example, check if the request data is FormData
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
  
    return config;
  });
