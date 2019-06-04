import API from "../classes/API";
import {SET_CHECKLIST_ITEM,FETCH_ITEMS,UPDATE_CHECKLIST_ITEM,CHANGE_ITEM_STATUS,DELETE_CHECKLIST_ITEM} from "./types";
import {Mixpanel as mixpanel} from "../mixpanel";

export const addItem = (item) => (dispatch) => {
    return API.request(`/checklists/`, 'POST',{checklist:{...item}}, 'auth').then((response) => {
         const {success} = response.data;
        dispatch({
            type: SET_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    })
};

export const fetchItem = () => (dispatch) => {
    return API.request(`/checklists`,'GET','auth').then((response) => {
        dispatch({
            type: FETCH_ITEMS, payload: response.data
        });
        return response
    });
}

export const updateItem = (itemId,item) => (dispatch) => {
    return API.request(`/checklists/${itemId}/`, 'PUT',{checklist:{...item}}, 'auth').then((response) => {
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
    return API.request(`/checklists/${item.id}/`, 'PUT',{checklist:{...item,status: !item.status}}, 'auth').then((response) => {
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

