import { LOAD_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "./types";
import API from "../classes/API";

export const loadTasks = projectId => async (dispatch, getState) => {
  return API.request(
    `http://127.0.0.1:8000/project/task/${projectId}`,
    "GET",
    null,
    "auth"
  ).then(response => {
    dispatch({ type: LOAD_TASKS, payload: response.data });
  });
};
