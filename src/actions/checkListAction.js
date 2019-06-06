import API from "../classes/API";
import {
    SET_CHECKLIST_ITEM,
    FETCH_ITEMS,
    UPDATE_CHECKLIST_ITEM,
    CHANGE_ITEM_STATUS,
    DELETE_CHECKLIST_ITEM
} from "./types";
import {Mixpanel as mixpanel} from "../mixpanel";

export const addItem = (item) => (dispatch) => {

    mixpanel.track('checklist_add_item');

    return API.request(`/checklists/`, 'POST', {checklist: {...item}}, 'auth').then((response) => {
        const {success} = response.data;
        dispatch({
            type: SET_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    })
};

export const fetchItem = (goalId) => (dispatch) => {
    return API.request(`/checklists/${goalId}/`, 'GET', 'auth').then((response) => {
        dispatch({
            type: FETCH_ITEMS, payload: response.data
        });
        return response
    });
};

export const updateItem = (itemId, item) => (dispatch) => {


    mixpanel.track('checklist_update_item');

    return API.request(`/checklists/${itemId}/`, 'PUT', {checklist: {...item}}, 'auth').then((response) => {
        const {success} = response.data;
        dispatch({
            type: UPDATE_CHECKLIST_ITEM, payload: {
                ...item,
                id: itemId
            }
        });
        return response;
    });
};
export const changeStatus = (item) => (dispatch) => {


    mixpanel.track('checklist_change_status_item');


    return API.request(`/checklists/${item.id}/`, 'PUT', {
        checklist: {
            ...item,
            status: !item.status
        }
    }, 'auth').then((response) => {
        const {success} = response.data;
        dispatch({
            type: CHANGE_ITEM_STATUS, payload: {
                ...item,
            }
        });
        return response;
    });
}
export const deleteItem = (item) => (dispatch) => {


    mixpanel.track('checklist_delete_item');

    return API.request(`/checklists/${item.id}/`, 'DELETE', 'auth').then((response) => {
        const {success} = response.data;
        dispatch({
            type: DELETE_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    });
}

