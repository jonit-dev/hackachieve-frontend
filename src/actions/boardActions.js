import {CHANGE_BOARD_SHOW_GOAL} from "./types";


export const changeBoardShowGoal = (type) => dispatch => {

    return new Promise((resolve) => {

        resolve(dispatch({type: CHANGE_BOARD_SHOW_GOAL, payload: type}));
    });


};

