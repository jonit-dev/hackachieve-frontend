import axios from 'axios';
import history from '../history';
import env from '../env.json';

export default class API {

    static getConfig() {
        return {
            url: env.path
        }
    }

    static request(url, method, data = {}, type = 'auth') {

        let customHeader = {};

        if (type === 'auth') { //if we're trying to access a authenticated route
            try {
                const token = JSON.parse(localStorage.getItem('userToken')); //set token as Authorization Bearer
                customHeader = {
                    Authorization: `Bearer ${token.access}`
                }
            }
            catch (error) { //if something wrong happens, lets just redirect the user to login and show an error message
                console.log(error);
                // history.push({pathname: '/login', state: {alert: 'Please, login before accessing this page'}})
                history.push({pathname: '/'})
            }
        }

        const customAxios = axios.create({
            baseURL: API.getConfig().url,
            headers: customHeader
        });

        return new Promise((resolve, reject) => {
            try {
                (async () => {
                    const response = await customAxios({
                        method,
                        url,
                        data
                    });
                    resolve(response);
                })();
            }
            catch (error) {                
                reject(error)
            }
        });

    }
}
