import { LOAD_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "./types";
import API from "../classes/API";

export const loadTasks = projectId => async dispatch => {
  return API.request(`/project/task/${projectId}`, "GET", null, "auth").then(
    response => {
      dispatch({ type: LOAD_TASKS, payload: response.data });
    }
  );
};

export const createTask = (projectId, task) => async dispatch => {
  return API.request(
    `/tasks/`,
    "POST",
    {
      title: task.title,
      project: projectId,
      checklist: [], //todo: add checklist later. This is just a placeholder
      description: null, //default null. user can edit it later on update modal
      deadline: new Date().toISOString().split("T")[0] //default as today
    },
    "auth"
  ).then(response => {
    dispatch({ type: CREATE_TASK, payload: response.data });
  });
};

export const deleteTask = taskId => dispatch => {
  return API.request(`/tasks/${taskId}`, "DELETE", null, "auth").then(
    response => {
      dispatch({ type: DELETE_TASK, payload: taskId });
    }
  );
};

export const updateTask = (taskId, updatedTask) => dispatch => {
  return API.request(`/tasks/${taskId}/`, "PUT", updatedTask, "auth").then(
    response => {
      dispatch({
        type: UPDATE_TASK,
        payload: {
          id: taskId,
          updatedTask: updatedTask
        }
      });
    }
  );
};
