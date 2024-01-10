import axios from 'axios'
import {KEYS} from './key'

let base_url = import.meta.env?.VITE_BASE_URL

export const client = axios.create({
    baseURL:base_url,
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':{
            toString(){
                let user = JSON.parse(localStorage.getItem(KEYS.USER))
                if(user)return `Bearer ${user?.access_token}`
            }
        }
    }
})
