import axios from 'axios';

let token = JSON.parse(localStorage.getItem('userToken')).access;

export const auth_axios = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        Authorization: `Bearer ${token}`
    },
});

export const guest_axios = axios.create({
    baseURL: 'http://localhost:8000/'
});



