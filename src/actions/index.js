import {auth_axios} from "../classes/API";
import {CLEAR_ALERT, LOGIN_USER, SHOW_ALERT} from "./types";
import * as qs from "qs";


/* Messages =========================================== */

export const clearAlert = () => dispatch => {

    dispatch({type: CLEAR_ALERT})
};


/* Authentication =========================================== */

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

        console.log('User logged in successfully!');
        console.log(response.data);

        //update our store with user credentials
        dispatch({type: LOGIN_USER, payload: response.data})

        //also update our localStorage
        //todo update localstorage
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
