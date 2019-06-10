import API from '../classes/API';
import {CREATE_LABELS,LOAD_LABELS} from './types'
import {Mixpanel as mixpanel} from "../mixpanel";
import { async } from 'q';


export const createLabels=(labels)=> async (dispatch, getState)=>{

    return API.request('/labels/', 'POST', {
        "name": labels.name
    },'auth').then((response)=>{
        
         dispatch({type:CREATE_LABELS, payload:labels})

    })
}


export const loadLabels = ()=> async(dispatch, getState)=>{
    return API.request('/labels/','GET',null,'auth').then((response)=>{
        dispatch({type:LOAD_LABELS, payload:response.data})
    })
}