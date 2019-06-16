import API from '../classes/API';
import {LOAD_LABELS, DELETE_LABELS} from './types'
import Analytics from "../analytics/Analytics";


export const createLabels = (label, goalId) => async (dispatch, getState) => {


    Analytics.track('label_add', {
        'eventCategory': 'labels',
        'eventAction': 'label_add',
    });

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


    Analytics.track('label_delete', {
        'eventCategory': 'labels',
        'eventAction': 'label_delete',
    });


    return API.request(`/labels/${label.id}/`, "DELETE", 'auth').then((response) => {
        dispatch({
            type: DELETE_LABELS, payload: {
                ...label
            }
        });
    });


};

export const updateLabel = (itemId, name) => (dispatch) => {


    Analytics.track('label_update', {
        'eventCategory': 'labels',
        'eventAction': 'label_update',
    });

    return API.request(`/labels/${itemId}/`, 'PUT', {
        "name": name
    }, 'auth').then((response) => {

        return response;
    });
};