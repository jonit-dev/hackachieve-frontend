import {UPDATE_LOCATION} from "../../actions/types";

// This is a generic UI reducer to handle state related with location, etc...

const INITIAL_STATE = {
    location: {pathname: '/'}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {...state, location: action.payload};

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