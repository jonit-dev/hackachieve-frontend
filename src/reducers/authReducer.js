import {LOGIN_USER} from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, anotherVar: true, anotherVar2: action.payload};
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