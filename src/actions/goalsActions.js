import API from "../classes/API";
import {
  LOAD_CATEGORIES,
  LOAD_GOALS,
  SHOW_ALERT,
  FILTER_GOALS,
  UPDATE_LONG_TERM_GOAL_STATE,
  FILE_UPLOAD_SUCCESS,
  SET_LOADING,
  CLEAR_FILE_UPLOAD
} from "./types";
import Analytics from "../analytics/Analytics";

export const loadGoals = (projectId, goalStatus) => async dispatch => {
  /*
    load all content (boards, short term and long term goals from a specific project)

    Goal status
    - all (all status below)
    - standby
    - ongoing
    - completed
    */
  return API.request(
    `/project/content/${projectId}/?goal_status=${goalStatus}`,
    "GET",
    null,
    "auth"
  ).then(response => {
    dispatch({ type: LOAD_GOALS, payload: response.data });
  });
};

export const deleteGoal = id => async dispatch => {
  Analytics.track("short_term_goal_delete", {
    eventCategory: "goals",
    eventAction: "short_term_goal_delete",
    eventLabel: `deleted shortermgoal id ${id}`,
    eventValue: 1
  });

  // await auth_axios.delete(`/goals/delete/${id}`); //send request to server
  return API.request(`/goals/delete/${id}/`, "DELETE", null, "auth");
};

export const deleteLongTermGoal = id => async dispatch => {
  Analytics.track("long_term_goal_delete", {
    eventCategory: "goals",
    eventAction: "long_term_goal_delete",
    eventLabel: `deleted longTermGoal id ${id}`,
    eventValue: 1
  });

  // await auth_axios.delete(`/goals/delete/${id}`); //send request to server
  return API.request(`/columns/delete/${id}/`, "DELETE", null, "auth");
};

export const loadUserGoalsCategories = projectId => async dispatch => {
  return API.request(`/project/boards/${projectId}/`, "GET", null, "auth").then(
    response => {
      dispatch({ type: LOAD_CATEGORIES, payload: response.data.board });
    }
  );
};

export const goalChangeStatus = (goalId, status) => async dispatch => {
  Analytics.track("goal_change_status", {
    eventCategory: "goals",
    eventAction: "goal_change_status",
    eventLabel: `goalId: ${goalId} - status: ${status}`,
    eventValue: status
  });

  return API.request(
    `/goals/update-status/${goalId}/${status}`,
    "PATCH",
    null,
    "auth"
  ).then(response => {});
};

export const goalSetPriority = (goalId, newPriority) => async dispatch => {
  Analytics.track("goal_set_priority", {
    eventCategory: "goals",
    eventAction: "goal_set_priority",
    eventLabel: `goalId: ${goalId} - newPriority: ${newPriority}`,
    eventValue: newPriority
  });

  return API.request(
    `/goals/update-priority/${goalId}/${newPriority}`,
    "PATCH",
    null,
    "auth"
  ).then(response => {});
};

export const createGoal = data => async dispatch => {
  return API.request("/goals/create/", "POST", data, "auth")
    .then(response => {
      Analytics.track("short_goal_create", {
        eventCategory: "goals",
        eventAction: "short_goal_create"
      });

      dispatch({
        type: SHOW_ALERT,
        payload: {
          type: "positive",
          title: "Goal created",
          content: "Your goal was created successfully!"
        }
      });

      return response;
    })
    .catch(err => {
      // If an error occured while trying to create your goal....
      console.log(err);
      Analytics.track("short_goal_create_error", {
        eventCategory: "goals",
        eventAction: "short_goal_create_error"
      });

      dispatch({
        type: SHOW_ALERT,
        payload: {
          type: "negative",
          title: "Oops!",
          content: err.data
        }
      });
    });
};

export const createLongTermGoal = data => async dispatch => {
  return API.request("/columns/create/", "POST", data, "auth").then(
    response => {
      const { status, message } = response.data;

      if (status === "success") {
        Analytics.track("long_goal_create", {
          eventCategory: "goals",
          eventAction: "long_goal_create"
        });
      } else {
        Analytics.track("long_goal_create_error", {
          eventCategory: "goals",
          eventAction: "long_goal_create_error"
        });
      }

      dispatch({
        type: SHOW_ALERT,
        payload: {
          type: status === "success" ? "positive" : "negative",
          title:
            status === "success" ? "Your long term goal was created!" : "Oops!",
          content: message
        }
      });

      return response;
    }
  );
};

export const filterGoals = category => dispatch => {
  Analytics.track("filter_goals", {
    eventCategory: "goals",
    eventAction: "filter_goals"
  });

  dispatch({
    type: FILTER_GOALS,
    payload: { category }
  });
};

export const editGoals = goal => dispatch => {
  return API.request(
    `/goals/update/${goal.goal_id}/`,
    "PUT",
    goal.goal_data,
    "auth"
  ).then(response => {
    console.log(response);

    const { column } = response.data;
    let message, status;

    if (column) {
      Analytics.track("short_goal_edit", {
        eventCategory: "goals",
        eventAction: "short_goal_edit"
      });
      status = "success";
      message = "Your goal was updated!";
    } else {
      Analytics.track("short_goal_edit_error", {
        eventCategory: "goals",
        eventAction: "short_goal_edit_error"
      });
      status = "error";
      message = response.data.message;
    }

    dispatch({
      type: SHOW_ALERT,
      payload: {
        type: status === "success" ? "positive" : "negative",
        title:
          status === "success" ? "Your short term goal was modified!" : "Oops!",
        content: message
      }
    });

    return status;
  });
};

export const updateGoal = goal => dispatch => {
  // Todo: we should use a PATCH request to update this goal. I have to remove the label, otherwise the drag and drop crashes.

  console.log(goal);

  return API.request(`/goals/update/${goal.id}/`, "PUT", goal, "auth");
};

export const editColumns = column => dispatch => {
  return API.request(
    `/columns/update/${column.column}/`,
    "PUT",
    column.column_data,
    "auth"
  ).then(response => {
    const { status, message } = response.data;

    if (status === "success") {
      Analytics.track("long_goal_edit", {
        eventCategory: "goals",
        eventAction: "long_goal_edit"
      });
    } else {
      Analytics.track("long_goal_edit_error", {
        eventCategory: "goals",
        eventAction: "long_goal_edit_error"
      });
    }

    dispatch({
      type: SHOW_ALERT,
      payload: {
        type: status === "success" ? "positive" : "negative",
        title:
          status === "success" ? "Your long term goal was modified!" : "Oops!",
        content: message
      }
    });

    return response;
  });
};

// The following API will create the new category, 'category' is 'boards' in backend
export const createNewCategory = value => async (dispatch, getState) => {
  console.log("CREATING NEW CATEGORY");
  console.log(value);

  const projectId = getState().projects.currentProjectId;

  // const response = await guest_axios.post('/user/register', userInfo);
  return API.request("/boards/create/", "POST", {
    name: value,
    description: "1",
    project: projectId
  }).then(response => {
    // Need to figure out the response as the server is giving 500 error,
    // https://hackachieve.slack.com/messages/DK2GCP79R/
    // data is being returned when the name parameter is sent with an empty string

    Analytics.track("goal_category_create", {
      eventCategory: "goals",
      eventAction: "goal_category_create"
    });

    console.log("Create board response", response);
    return response;
  });
};

// The following API will delete the new category
export const deleteNewCategory = value => async dispatch => {
  // const response = await guest_axios.post('/user/register', userInfo);
  return API.request("boards/delete/" + value, "DELETE", null, "auth").then(
    response => {
      Analytics.track("goal_category_delete", {
        eventCategory: "goals",
        eventAction: "goal_category_delete"
      });

      console.log("Delete board response", response);
      return response;
    }
  );
};

/*#############################################################|
|  >>> DRAG AND DROP SYSTEM
*##############################################################*/

export const reorderGoal = (type, goalId, newPosition) => async dispatch => {
  switch (type) {
    case "short-term-goal":
      return API.request(`/goals/update-order/${goalId}/`, "PUT", {
        order_position: newPosition
      });
    case "long-term-goal":
      return API.request(`/columns/update-order/${goalId}/`, "PUT", {
        order_position: newPosition
      });

    default:
      return API.request(`/goals/update-order/${goalId}/`, "PUT", {
        order_position: newPosition
      });
  }
};

export const updateLongTermGoalState = (
  longTermGoalId,
  newLongTermGoal
) => dispatch => {
  dispatch({
    type: UPDATE_LONG_TERM_GOAL_STATE,
    payload: {
      longTermGoalId,
      newLongTermGoal
    }
  });
};

export const uploadFile = data => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  return API.request("/upload/", "POST", data, "auth").then(response => {
    const { status } = response.data;

    if (status === "success") {
      Analytics.track("upload_file", {
        eventCategory: "goals",
        eventAction: "upload_file"
      });
    } else {
      Analytics.track("upload_file_error", {
        eventCategory: "goals",
        eventAction: "upload_file_error"
      });
    }
    dispatch({
      type: FILE_UPLOAD_SUCCESS,
      payload: response.data
    });
    return response;
  });
};

export const attachFileToGoal = (goalId, payload) => dispatch => {
  return API.request(
    `/goals/update-file/${goalId}/`,
    "PUT",
    payload,
    "auth"
  ).then(response => {
    const { file } = response.data;

    if (file) {
      Analytics.track("attach_file_to_goal", {
        eventCategory: "goals",
        eventAction: "attach_file_to_goal"
      });
    } else {
      Analytics.track("attach_file_to_goal_error", {
        eventCategory: "goals",
        eventAction: "attach_file_to_goal_error"
      });
    }

    dispatch({
      type: SHOW_ALERT,
      payload: {
        type: file ? "positive" : "negative",
        title: file ? "File attached to goal!" : "Oops!",
        content: "File attached to goal!"
      }
    });

    return response;
  });
};

export const clearFileUpload = () => dispatch => {
  dispatch({
    type: CLEAR_FILE_UPLOAD
  });
};
