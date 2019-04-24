import {CLEAR_ALERT, SHOW_ALERT} from "../actions/types";

const INITIAL_STATE = {
    message: {
        type: null,
        title: null,
        content: null
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_ALERT:

            const {type, title, content} = action.payload;

            return {
                ...state, message: {
                    type,
                    title,
                    content
                }
            };

        case CLEAR_ALERT:
            return {...state, message: INITIAL_STATE.message};

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