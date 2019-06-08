import API from "../classes/API";
import {LOAD_TAGS} from "./types";

export const loadTags = () => async (dispatch, getState) => {
    return API.request(`/areas-of-knowledge`, 'GET', null, 'auth').then((response) => {
        dispatch({type: LOAD_TAGS, payload: response.data})
    });
};

export const createTags = (tags) => async (dispatch, getState) => {

    let data = tags.knowledgeSelector.map(({value, label}) => {
        return {name: label}
    });

    return API.request(`/areas-of-knowledge/`, 'POST', {
        "areas_of_knowledge": data
    }, 'auth').then((response) => {
        console.log('posted');
        console.log(response.data);
        return response;
    });
};


// export const createTag = (tagName)=> async (dispatch, getState)=>{
//     return API.request(`/areas-of-knowledge/`, 'POST', {
//         "areas_of_knowledge":[
//            { name: tagName}
//         ]
//     },'auth').then((response)=>{
//         console.log(response)
//         dispatch({type:CREATE_TAGS, payload:tagName})
//     })
// };
