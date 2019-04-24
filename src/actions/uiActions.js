import {CLEAR_ALERT, SHOW_ALERT} from "./types";

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

