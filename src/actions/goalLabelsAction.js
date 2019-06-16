import API from '../classes/API';
import {LOAD_LABELS, DELETE_LABELS} from './types'


export const createLabels = (label, goalId) => async (dispatch, getState) => {
    return API.request(`/labels/goal/${goalId}/`, 'POST', {
        "name": label.tag
    }, 'auth').then((response) => {

        return response

    })
};


export const loadLabels = (goalId) => async (dispatch, getState) => {
    return API.request(`/labels/goal/${goalId}/`, 'GET', 'auth').then((response) => {
        dispatch({type: LOAD_LABELS, payload: response.data});
        return response
    })
};


export const deleteLabels = (label) => async (dispatch, getState) => {
    return API.request(`/labels/${label.id}/`, "DELETE", 'auth').then((response) => {
        dispatch({
            type: DELETE_LABELS, payload: {
                ...label
            }
        });
    });


};

export const updateLabel = (itemId, name) => (dispatch) => {
    return API.request(`/labels/${itemId}/`, 'PUT', {
        "name": name
    }, 'auth').then((response) => {

        return response;
    });
};