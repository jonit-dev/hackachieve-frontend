/* Authentication =========================================== */

import axios from "axios";
import * as qs from "qs";
import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, SHOW_ALERT} from "./types";
import history from '../history';
import API from '../classes/API';

export const userLogin = (credentials) => async (dispatch) => {


    try {
        //here we use guest_axios because we have no token on headers to pass (obviously, because we're TRYING to log in!)
        const response = await axios.post(`/api/token/`, qs.stringify(credentials), {
            baseURL: API.getConfig().url,
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



        setTimeout(() => {


            //update our store with user credentials
            dispatch({type: LOGIN_USER, payload: response.data});

            const {access, refresh} = response.data;

            //also update our localStorage

            localStorage.setItem('userToken', JSON.stringify({
                'access': access,
                'refresh': refresh
            }));

            //then move the user to the board

            history.push('/board');




        },3000);



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

    //clear localstorage
    localStorage.clear();

    dispatch({type: LOGOUT_USER}) //then we'll also clear our state
};


export const checkLoggedIn = () => async (dispatch) => {

    // This action checks if the user has already logged in the past by verifying if there's some cache token information

    const token = JSON.parse(localStorage.getItem('userToken'));

    try {
        if (token.access) {
            const {access, refresh} = token;


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


export const userRegister = (userInfo) => async (dispatch) => {

    // const response = await guest_axios.post('/user/register', userInfo);
    return API.request('/user/register', 'POST', userInfo, 'guest').then((response) => {

        if (response.data.status === 'success') {

            dispatch({
                type: SHOW_ALERT, payload: {
                    type: 'positive',
                    title: 'User created successfully!',
                    content: 'Are you ready to hack your productivity?'
                }
            });

            localStorage.setItem('userInfo', JSON.stringify({
                'firstName': userInfo.firstName,
                'lastName': userInfo.lastName,
                'email': userInfo.email
            }));

            dispatch({type: REGISTER_USER, payload: userInfo}); //register user


        } else {

            dispatch({
                type: SHOW_ALERT, payload: {
                    type: 'negative',
                    title: 'Failed to Register your user',
                    content: response.data.message
                }
            })
        }

    })

};

