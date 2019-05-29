import API from "../classes/API";
import {SET_CHECKLIST_ITEM} from "./types";
import {Mixpanel as mixpanel} from "../mixpanel";

export const addItem = (item) => (dispatch) => {
    console.log(item)
    return API.request(`/checklists/`, 'POST',{checklist:{...item}}, 'auth').then((response) => {
        console.log(response)
         const {success} = response.data;
        dispatch({
            type: SET_CHECKLIST_ITEM, payload: {
                ...item
            }
        });
        return response;
    });
};

