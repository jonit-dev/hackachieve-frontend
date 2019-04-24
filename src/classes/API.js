import axios from 'axios';

export const auth_axios = axios.create({
    baseURL: 'http://localhost:8000/',
    // headers: {
    //     Authorization: 'Bearer tokenhere'
    // },
});


export const guest_axios = axios.create({
    baseURL: 'http://localhost:8000/'
});



