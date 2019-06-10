import {CREATE_LABELS, LOAD_LABELS} from '../actions/types'
import { stat } from 'fs';

const  INITIAL_STATE = {
    labels: [],
    a: "aa",
    msg:""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_LABELS:
        console.log("reducers==",action);
         const label = {value:action.payload, label: action.payload}
        state.labels.push(label)
            return {
                ...state
            };

        case LOAD_LABELS:
        const labelvalue = {value:action.payload, label: action.payload}
        console.log('reducers=========', labelvalue)
        

        return {
            ...state,
            labels:  labelvalue
        };

        default:
        return state;
    }

}