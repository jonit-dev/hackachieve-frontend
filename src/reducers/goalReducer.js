import {LOAD_GOALS} from "../actions/types";

const INITIAL_STATE = {
    goals: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOAD_GOALS:

            return {
                ...state,
                goals: action.payload,

            };

        // case DELETE_GOAL:
        //
        //     const updatedGoals = state.goals.map((goal) => {
        //         goal.long_term_goals.forEach((ltg) => {
        //             if (ltg.short_term_goals.length > 0) {
        //                 ltg.short_term_goals = ltg.short_term_goals.filter((stg) => stg.id !== action.payload)
        //             }
        //         });
        //         return goal;
        //     });
        //     return {...state, goals: updatedGoals};


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