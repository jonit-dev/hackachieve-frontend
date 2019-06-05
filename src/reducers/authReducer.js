import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, USER_INFO_REFRESH} from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    canRedirectLogin: false,
    token: {
        access: null,
        refresh: null
    },
    user: {
        firstName: null,
        lastName: null,
        email: null
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
            return {
                ...state,
                isLoggedIn: INITIAL_STATE.isLoggedIn,
                canRedirectLogin: INITIAL_STATE.canRedirectLogin,
                token: INITIAL_STATE.token,
                user: INITIAL_STATE.user
            };

        case REGISTER_USER:

            const {firstName, lastName, email} = action.payload;

            return {
                ...state, user: {
                    firstName,
                    lastName,
                    email
                },
                canRedirectLogin: true //allow user auto login after register
            };

        case USER_INFO_REFRESH:

            console.log('reducer');
            console.log(action.payload);

            return {
                ...state, user: {

                    firstName: action.payload.first_name,
                    lastName: action.payload.last_name,
                    email: action.payload.email

                }
            };


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
