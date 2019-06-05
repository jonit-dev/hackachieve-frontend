import {CHANGE_BOARD_SHOW_GOAL} from "./types";
import {Mixpanel as mixpanel} from '../mixpanel';


export const changeBoardShowGoal = (type) => dispatch => {

    mixpanel.track('board_switch_show_goal');

    return new Promise((resolve) => {

        resolve(dispatch({type: CHANGE_BOARD_SHOW_GOAL, payload: type}));
    });


};

