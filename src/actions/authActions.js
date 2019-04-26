/* Authentication =========================================== */

import {auth_axios} from "../classes/API";
import * as qs from "qs";
import {LOGIN_USER, LOGOUT_USER, SHOW_ALERT} from "./types";
import history from '../history';

export const userLogin = (credentials) => async (dispatch) => {

    try {

        const response = await auth_axios.post(`/api/token/`, qs.stringify(credentials), {
            withCredentials: true,
            headers: {
                "Authorization": "Basic Og==",
                "Content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            }
        });

        //show success message
        dispatch({
            type: SHOW_ALERT, payload: {
                type: 'positive',
                title: 'Welcome back!',
                content: "You've logged in successfully!"
            }
        });

        //update our store with user credentials
        dispatch({type: LOGIN_USER, payload: response.data})

        const {access, refresh} = response.data;

        //also update our localStorage

        localStorage.setItem('user', JSON.stringify({
            'token': {
                'access': access,
                'refresh': refresh
            }
        }))

        //then move the user to the board

        history.push('/board');

    }
    catch (error) {

        dispatch({
            type: SHOW_ALERT, payload: {
                type: 'negative',
                title: 'Failed to login!',
                content: 'Please, double check your e-mail and password.'
            }
        });

        console.log('Failed to login!');
        console.error(error);

    }

};


export const userLogout = () => dispatch => {

    console.log('logging out user!');

    //clear localstorage
    localStorage.clear();

    dispatch({type: LOGOUT_USER}) //then we'll also clear our state
};


export const checkLoggedIn = () => async (dispatch) => {

    // This action checks if the user has already logged in the past by verifying if there's some cache token information

    const user = JSON.parse(localStorage.getItem('user'));

    try {
        if (user.token.access) {
            const {access, refresh} = user.token;


            //if some token cache was found on localStorage, let's login the user!
            dispatch({
                type: LOGIN_USER, payload: {
                    access,
                    refresh
                }
            })
        }
    }
    catch (error) {
        //do nothing on error! It simply means that there's no cache information!
    }


};

