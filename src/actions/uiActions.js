import {CLEAR_ALERT, CLOSE_MODAL, OPEN_MODAL, SHOW_ALERT, UPDATE_LOCATION} from "./types";

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

export const toggleModal = (name) => (dispatch, getState)=> {

    if(getState().ui.modals[name] === false) { //if current modal is closed, lets open it
        dispatch({type: OPEN_MODAL, payload: name})
    } else {
        dispatch({type: CLOSE_MODAL, payload: name}) //if its closed, lets open
    }
};



