import API from '../classes/API';
import {CREATE_LABELS,LOAD_LABELS,DELETE_LABELS, UPDATE_LABEL} from './types'
import {Mixpanel as mixpanel} from "../mixpanel";
import { async } from 'q';


export const createLabels=(label)=> async (dispatch, getState)=>{
    return API.request('/labels/', 'POST', {
        "name": label.name
    },'auth').then((response)=>{
        
        dispatch({
            type: CREATE_LABELS, payload: {
                ...label
            }
        });
         return response

    })
}


export const loadLabels = ()=> async(dispatch, getState)=>{
    return API.request('/labels/','GET','auth').then((response)=>{
        dispatch({type:LOAD_LABELS, payload:response.data})
        return response
    })
}


export const deleteLabels=(label)=> async(dispatch, getState)=>{
    return API.request('/labels/'+label.id+"/","DELETE", 'auth').then((response)=>{
        dispatch({type:DELETE_LABELS, payload: {
            ...label
        }
        });
    });

    

}    

export const updateLabel = (itemId, name) => (dispatch) => {
    
    return API.request(`/labels/${itemId}/`, 'PUT', {
        "name": "64 name change"
    }, 'auth').then((response) => {

        console.log("value", response.data)

        dispatch({
            type: UPDATE_LABEL, payload: {
                // ...item,
                // id: itemId
            }
        });
        return response;
    });
}
