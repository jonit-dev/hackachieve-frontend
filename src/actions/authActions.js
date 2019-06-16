/* Authentication =========================================== */

import axios from "axios";
import * as qs from "qs";
import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, SHOW_ALERT, USER_INFO_REFRESH} from "./types";
import history from '../history';
import API from '../classes/API';
import {Mixpanel as mixpanel} from '../analytics/mixpanel';
import Analytics from "../analytics/Analytics";

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


        Analytics.track('user_logged_in', {
            'eventCategory': 'account',
            'eventAction': 'user_logged_in',
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

            // if(credentials.register){
            //     history.push('/preferences');
            //
            // }else{
            //     history.push('/board');
            // }

        }, 1000);


    }
    catch (error) {

        Analytics.track('user_login_error', {
            'eventCategory': 'account',
            'eventAction': 'user_login_error',
        });
        

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
    
    Analytics.track('user_logout', {
        'eventCategory': 'account',
        'eventAction': 'user_logout',
    });
    
    

    dispatch({type: LOGOUT_USER}); //then we'll also clear our state
    history.push('/')
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


            Analytics.track('user_registered', {
                'eventCategory': 'account',
                'eventAction': 'user_registered',
            });
            
            dispatch({
                type: SHOW_ALERT, payload: {
                    type: 'positive',
                    title: 'User created successfully!',
                    content: 'Are you ready to hack your productivity?'
                }
            });

            /* Mixpanel: Identify =========================================== */

            mixpanel.identify(userInfo.email);

            mixpanel.people.set({
                "$email": userInfo.email,    // only special properties need the $
                "$created": new Date(),
                "$last_login": new Date(),         // properties can be dates...
                "$first_name": userInfo.firstName,
                "$last_name": userInfo.lastName,
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


export const userInfoRefresh = () => async (dispatch) => {


    return API.request('/user/info/', 'GET', null, 'auth').then((response) => {

        dispatch({type: USER_INFO_REFRESH, payload: response.data})

    });

};
