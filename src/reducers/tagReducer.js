import {LOAD_TAGS,CREATE_TAGS} from "../actions/types";

const INITIAL_STATE = {
    tags: [],
    a: "aa",
    msg:""
};

export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
        
        case LOAD_TAGS: 
            const tags = action.payload.map(tag => {
                return {
                    value: tag.name,
                    label: tag.name
                }
            })
            return {
                ...state,
                tags:  tags
            };

        case CREATE_TAGS:
        const tag = {value:action.payload, label: action.payload}
        state.tags.push(tag)
            return {
                ...state
            };
        default:
            return state;
    }



}


