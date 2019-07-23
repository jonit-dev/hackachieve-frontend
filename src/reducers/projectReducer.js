import {
  LOAD_PROJECTS
} from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  filter: "All"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    default:
      return state;
  }
};