import {CHANGE_BOARD_SHOW_GOAL} from "./types";
import Analytics from "../analytics/Analytics";


export const changeBoardShowGoal = (type) => dispatch => {

    Analytics.track('board_switch_show_goal', {
        'eventCategory': 'goals',
        'eventAction': 'board_switch_show_goal',
    });

    return new Promise((resolve) => {

        resolve(dispatch({type: CHANGE_BOARD_SHOW_GOAL, payload: type}));
    });


};

