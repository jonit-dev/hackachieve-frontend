import API from "../classes/API";
import { LOAD_PROJECTS, SHOW_ALERT, SEARCH_USERS, SET_LOADING } from "./types";
import { SET_CURRENT_PROJECT } from "./types";
import Analytics from "../analytics/Analytics";

export const loadProjects = () => async dispatch => {
  return API.request(`/project/`, "GET", null, "auth").then(response => {
    dispatch({ type: LOAD_PROJECTS, payload: response.data });
  });
};

export const createProject = data => async dispatch => {
  return API.request(`/project/`, "POST", data, "auth").then(response => {
    const { name } = response.data;

    if (name !== "") {
      response.status = "success";
      Analytics.track("project_create", {
        eventCategory: "projects",
        eventAction: "project_create"
      });
    } else {
      response.status = "fail";
      Analytics.track("project_create_error", {
        eventCategory: "projects",
        eventAction: "project_create_error"
      });
    }

    dispatch({
      type: SHOW_ALERT,
      payload: {
        type: name !== "" ? "positive" : "negative",
        title: name !== "" ? "Your project was created!" : "Oops!",
        content: "Your project was created!"
      }
    });

    return response;
  });
};

// The following API will delete the new project
export const deleteProject = value => async dispatch => {
  return API.request(`/project/` + value, "DELETE", null, "auth").then(
    response => {
      Analytics.track("project_delete", {
        eventCategory: "projects",
        eventAction: "project_delete"
      });

      // console.log("Delete Project response", response);
      return response;
    }
  );
};

// this is responsible for setting the current project that is currently loaded by the user.

export const setCurrentProject = projectId => dispatch => {
  return API.request(`/project/` + projectId, "GET", null, "auth").then(response => {
    dispatch({ type: SET_CURRENT_PROJECT, payload: response.data });
  });


};

// this is responsible for searching user by name or email.
export const searchUsers = (keyword) => async dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  return API.request(`/user/search/` + keyword, "GET", null, "auth").then(response => {
    dispatch({ type: SEARCH_USERS, payload: response.data });
  });
};


