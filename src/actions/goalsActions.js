import {auth_axios} from "../classes/API";
import {DELETE_GOAL, LOAD_GOALS} from "./types";


export const loadGoals = (id, status) => async (dispatch, getState) => {

    /*
    load both short term and long term goals from a specific goal status
    if id = 0 it will load all goals from a specific user
     status available are:

    - all (all status below)
    - standby
    - ongoing
    - completed
    */

    const response = await auth_axios.get(`/boards/show/${id}/${status}`);

    dispatch({type: LOAD_GOALS, payload: response.data})
};


export const deleteGoal = (id) => async (dispatch) => {

    await auth_axios.delete(`/goals/delete/${id}`); //send request to server

    dispatch({type: DELETE_GOAL, payload: id})
};
