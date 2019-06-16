import API from "../classes/API";
import {LOAD_TAGS} from "./types";
import Analytics from "../analytics/Analytics";

export const loadTags = () => async (dispatch, getState) => {
    return API.request(`/areas-of-knowledge`, 'GET', null, 'auth').then((response) => {
        dispatch({type: LOAD_TAGS, payload: response.data})
    });
};

export const createTags = (tags) => async (dispatch, getState) => {



    Analytics.track('user_add_knowledge_area', {
        'eventCategory': 'account',
        'eventAction': 'user_add_knowledge_area',
    });


    let data = tags.knowledgeSelector.map(({value, label}) => {
        return {name: label}
    });

    return API.request(`/areas-of-knowledge/`, 'POST', {
        "areas_of_knowledge": data
    }, 'auth').then((response) => {
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
