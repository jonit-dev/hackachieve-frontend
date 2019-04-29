import {CLEAR_ALERT, SHOW_ALERT, UPDATE_LOCATION} from "./types";

/* Messages =========================================== */

export const clearAlert = () => dispatch => {
    dispatch({type: CLEAR_ALERT})
};


export const showAlert = (type, message, content) => dispatch => {
    dispatch({
        type: SHOW_ALERT, payload: {
            type,
            message,
            content
        }
    })
};

export const updateLocation = (location) => async (dispatch) => {

    dispatch({type: UPDATE_LOCATION, payload: location})
};
