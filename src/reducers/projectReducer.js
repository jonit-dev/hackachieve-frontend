import { LOAD_PROJECTS, SET_CURRENT_PROJECT } from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  filter: "All",
  currentProjectId: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProjectId: action.payload
      };

    case LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    default:
      return state;
  }
};
