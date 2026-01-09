import axios from 'axios';

export async function generateName(){
    try{
        const res = await axios.get('https://randomuser.me/api/')
        return res.data.results[0].login.username
    }catch(err){
        console.error(err)
    }
}