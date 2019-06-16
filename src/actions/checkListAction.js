import API from "../classes/API";
import {
    SET_CHECKLIST_ITEM,
    FETCH_ITEMS,
    UPDATE_CHECKLIST_ITEM,
    CHANGE_ITEM_STATUS,
    DELETE_CHECKLIST_ITEM
} from "./types";
import Analytics from "../analytics/Analytics";



export const checklistAddItem = (item) => (dispatch) => {

    Analytics.track('checklist_add_item', {
        'eventCategory': 'checklists',
        'eventAction': 'checklist_add_item',
    });


    return API.request(`/checklists/`, 'POST', {checklist: {...item}}, 'auth').then((response) => {

        dispatch({
            type: SET_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    })
};

export const checklistFetchItem = (goalId) => (dispatch) => {
    return API.request(`/checklists/${goalId}/`, 'GET', 'auth').then((response) => {
        dispatch({
            type: FETCH_ITEMS, payload: response.data
        });
        return response
    });
};

export const checklistUpdateItem = (itemId, item) => (dispatch) => {


    Analytics.track('checklist_update_item', {
        'eventCategory': 'checklists',
        'eventAction': 'checklist_update_item',
    });


    return API.request(`/checklists/${itemId}/`, 'PUT', {checklist: {...item}}, 'auth').then((response) => {

        dispatch({
            type: UPDATE_CHECKLIST_ITEM, payload: {
                ...item,
                id: itemId
            }
        });
        return response;
    });
};
export const checklistChangeStatus = (item) => (dispatch) => {

    Analytics.track('checklist_change_status_item', {
        'eventCategory': 'checklists',
        'eventAction': 'checklist_change_status_item',
    });


    return API.request(`/checklists/${item.id}/`, 'PUT', {
        checklist: {
            ...item,
            status: !item.status
        }
    }, 'auth').then((response) => {

        dispatch({
            type: CHANGE_ITEM_STATUS, payload: {
                ...item,
            }
        });
        return response;
    });
}
export const checklistDeleteItem = (item) => (dispatch) => {

    Analytics.track('checklist_delete_item', {
        'eventCategory': 'checklists',
        'eventAction': 'checklist_delete_item',
    });

    return API.request(`/checklists/${item.id}/`, 'DELETE', 'auth').then((response) => {

        dispatch({
            type: DELETE_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    });
};

