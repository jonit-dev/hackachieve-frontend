import API from './API'
import qs from 'qs';
import axios from "axios";

//lets load our custom AXIOS client
//We're doing it to avoid having to type the server URL every time we do a request

 
export default class User {

    static register(user) {
        //request to server to register a new user
        console.log(user);
        
        return API.request('POST', `/user/register/`, user, false).then(response => {
            console.log(response.data);

            console.log(response.data.status);

            if (response.data.status === 'success') {

                console.log("User account created successfully!");

                setTimeout(() => {
                    window.location.replace("/login");
                }, 1000);

                return {
                    message: {
                        title: "Welcome",
                        description: response.data.message,
                        status: response.data.status
                    }
                };


            } else {
                console.log('register operation failed');

                return {
                    message: {
                        title: "Oops!",
                        description: response.data.message,
                        status: response.data.status
                    }
                };


            }
        }).catch(error => {
            console.log('register error: ');
            console.log(error)
        });

    }

    static login(credentials) {
console.log(credentials,'cred')
        const userLogin = async () => {

            //login is a little bit different from other post routes.. we should use qs.stringify because it should emulate a form submission (django API.requirement)

            const response = await axios.post(`/api/token/`, qs.stringify(credentials), {
                withCredentials: true,
                headers: {
                    "Authorization": "Basic Og==",
                    "Content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",

                }, baseURL: API.getConfig().baseUrl
            });
            console.log(response.data,'response.data')
            return response.data


        };
        return userLogin();


    }

    static isLoggedIn() {
console.log(localStorage.getItem('userToken'),"localStorage.getItem('userToken')")
        //try to get token information from localstorage.

        try {
            // console.log("checking if user is logged in...");
            let token = JSON.parse(localStorage.getItem('userToken')).access;
            if (token) {
                return true;
            }
console.log(token,'yot')
            // console.log(`Yes, he's. Token: ${token}`);
        }
        catch (error) {
            return false;
        }


    }

    static getToken() {

        //try to get token information from localstorage.
        try {
            // console.log("checking if user is logged in...");
            let token = JSON.parse(localStorage.getItem('user')).token;
            // console.log(`Yes, he's. Token: ${token}`);
            return token;
        }
        catch (error) {
            return false;
        }

    }

    static logout() {


        console.log('logging out user');

        //lets clear our cache (token)
        localStorage.clear();

        //then redirect user to login page.

        window.location.href = '/login';


    }

    /* BOARD FUNCTIONS =========================================== */

    static getBoard() {

        return API.request('GET', '/boards', null, true);

        // return API.oggedMode.get(`/boards`);
    }


    /* COLUMN FUNCTIONS =========================================== */

    static getColumns(num) {
        return API.request('GET', `/columns/board/${num}`, null, true)
    }


    /* GOAL FUNCTIONS =========================================== */


    static createGoal(col) {
        return API.request('POST', `/goals/create/`, col, true);
    }


}
