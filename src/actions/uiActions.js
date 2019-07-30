import {
  CLEAR_ALERT,
  CLOSE_MODAL,
  OPEN_MODAL,
  SHOW_ALERT,
  UPDATE_LOCATION,
  CHANGE_SELECTED_PANEL
} from "./types";
import Analytics from "../analytics/Analytics";

/* Messages =========================================== */

export const clearAlert = () => dispatch => {
  dispatch({ type: CLEAR_ALERT });
};

export const showAlert = (type, message, content) => dispatch => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      type,
      message,
      content
    }
  });
};

export const updateLocation = location => async dispatch => {
  dispatch({ type: UPDATE_LOCATION, payload: location });
};

export const toggleModal = (name, id = null) => (dispatch, getState) => {
  if (getState().ui.modals[name].status === false) {
    //if current modal is closed, lets open it
    dispatch({ type: OPEN_MODAL, payload: { name, id } });
  } else {
    dispatch({ type: CLOSE_MODAL, payload: { name, id } }); //if its closed, lets open
  }
};

export const changeSelectedPanel = panel => dispatch => {
  Analytics.track("change_selected_panel", {
    eventCategory: "ui",
    eventAction: "change_selected_panel"
  });

  dispatch({ type: CHANGE_SELECTED_PANEL, payload: panel });
};
