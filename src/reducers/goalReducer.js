import {LOAD_GOALS, FILTER_GOALS} from "../actions/types";

const INITIAL_STATE = {
    goals: null,
    filter: 'All'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOAD_GOALS:

            return {
                ...state,
                goals: action.payload,

            };
        case FILTER_GOALS: 
            return {
                ...state,
                filter: action.payload.category
            }    

        default:
            return state;
    }
}


/*

 =========  Safe state update in reducers =========

// From arrays
Removing: state.filter(element => element !== 'hi');
adding: [...state, 'hi'];
replacing: state.map(el => el === 'hi' ? 'bye': el);

//From objects
updating: {...state, name: 'Sam'};
adding: {...state, age: 30};
removing: {state, age: undefined }

*/