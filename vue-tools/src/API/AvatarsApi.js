import axios from 'axios';
import {ref, onMounted} from 'vue'

export async function generateAvatar(options){
    const queryString = new URLSearchParams(options).toString() 
    const url = `https://api.dicebear.com/9.x/notionists-neutral/svg?${queryString}`
    const res = await axios.get(url)
    return res.data
}