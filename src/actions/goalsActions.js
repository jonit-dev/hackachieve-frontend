import {auth_axios} from "../classes/API";
import {LOAD_GOALS} from "./types";


export const loadGoals = (id, status) => async (dispatch, getState)=> {

    //load both short term and long term goals from a specific goal status
    //if id = 0 it will load all goals from a specific user
    // status available are:
    //
    // all (all status below)
    //standby
    //ongoing
    //completed

    const response = await auth_axios.get(`/boards/show/${id}/${status}`);

    console.log(response.data);

    dispatch({type: LOAD_GOALS, payload: response.data})
};
