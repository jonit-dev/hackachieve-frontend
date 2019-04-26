import {LOGIN_USER, LOGOUT_USER} from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    token: {
        access: null,
        refresh: null
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:

            const {access, refresh} = action.payload;

            return {
                ...state, isLoggedIn: true, token: {
                    access, refresh
                }
            };

        case LOGOUT_USER:

            return {...state, isLoggedIn: INITIAL_STATE.isLoggedIn, token: INITIAL_STATE.token};

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