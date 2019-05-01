import {OPEN_MODAL, CLOSE_MODAL, UPDATE_LOCATION} from "../../actions/types";

// This is a generic UI reducer to handle state related with location, etc...

const INITIAL_STATE = {
    location: {pathname: '/'},
    modals: { //controls opening and closing of modals
        shortTermGoal: false
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {...state, location: action.payload};


        case OPEN_MODAL:
            return {...state, modals: {
                    ...state, [action.payload]: true
                }};

        case CLOSE_MODAL:
            return {...state, modals: {
                    ...state, [action.payload]: false
                }};


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