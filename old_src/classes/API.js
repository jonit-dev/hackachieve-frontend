import axios from "axios";

export default class API {
    static getConfig() {
        return {
	    // baseUrl: `https://hackachieve.com:8000`,
            baseUrl: `http://localhost:8000`
        }
    }


    static request(type, url, data, useAuthentication) {

        switch (type) {
            case 'GET':
                if (!useAuthentication) {
                    return axios.get(`${API.getConfig().baseUrl}${url}`, {
                        params: data
                    });
                } else {

                    let token = API.getToken();

                    return axios.get(`${API.getConfig().baseUrl}${url}`, {
                        params: data,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

            case 'PUT':
                if (!useAuthentication) {

                    return axios.put(`${API.getConfig().baseUrl}${url}`, data);
                } else {

                    let token = API.getToken();

                    return axios.put(`${API.getConfig().baseUrl}${url}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },

                    });


                }

            case 'DELETE':
                if (!useAuthentication) {

                    return axios.delete(`${API.getConfig().baseUrl}${url}`, {
                        data
                    });
                } else {

                    let token = API.getToken();

                    return axios.delete(`${API.getConfig().baseUrl}${url}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data
                    });


                }

            case 'POST':

                if (!useAuthentication) {

                    return axios.post(`${API.getConfig().baseUrl}${url}`, data);
                } else {

                    let token = API.getToken();

                    return axios.post(`${API.getConfig().baseUrl}${url}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });


                }


            default:
                console.log("API request failed - reached default case on switch statement.");
                return false;
        }


    }

    static getToken() {
        try {
            return JSON.parse(localStorage.getItem('user')).token;
        }
        catch (error) {
            if (window.location.pathname !== '/login') { //if we're not already on login. We have to check it, otherwise it will give a infinite loop on login
                console.error(error);
                console.log('Error: You should login before doing an authenticated request');
                window.location.href = '/login'; //send user to login again
            }
        }
    }


    static getCustomAxios(guestMode = false) {

        // Description: This is our main axios request client. It has two modes: guestMode, that's used when we're doing requests on unauthenticated routes and loggedInMode, that's used for authenticated routes


        /* guestMode =========================================== */

        if (guestMode) { //guest request to public (unprotected) routes, does not need do pass a authorization token
            return axios.create({
                baseURL: 'http://localhost:8000/' //note that we're on port 8000 now (django server)
            });

        } else {

            /* LoggedInMode =========================================== */

            try {
                let token = JSON.parse(localStorage.getItem('user')).token;

                return axios.create({
                    baseURL: 'http://localhost:8000/',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            }
            catch (error) {


                if (window.location.pathname !== '/login') { //if we're not already on login. We have to check it, otherwise it will give a infinite loop on login

                    console.error(error);
                    console.log('Error: You should login before doing an authenticated request');

                    window.location.href = '/login'; //send user to login again
                }


            }


        }


    }
}
 
