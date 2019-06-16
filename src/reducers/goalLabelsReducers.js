import {CREATE_LABELS, LOAD_LABELS, DELETE_LABELS, UPDATE_LABEL} from '../actions/types'

const  INITIAL_STATE = {
    labels: [],
    msg:"",
    data: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CREATE_LABELS:
            return {
                ...state,
                labels: [
                    ...state.labels,
                    action.payload
                ],
            };
        case LOAD_LABELS:
            return {
                ...state,
                labels: action.payload
            };
        case DELETE_LABELS:
            const newItemDel = state.labels.filter(label => label.id !== action.payload.id);
            return {
                ...state,
                labels: newItemDel
            };

        case UPDATE_LABEL:
            
            let items = state.labels
            let newItems = items.map(item => {
                if (action.payload.id === item.id) {
                    item = action.payload
                }
                return item
            });
            return {
                ...state,
                labels: newItems
            };
        default:
            return state;
    }

}