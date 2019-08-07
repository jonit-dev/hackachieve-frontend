import { LOAD_PROJECTS, SET_CURRENT_PROJECT, SEARCH_USERS, SET_LOADING } from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  filter: "All",
  currentProjectId: 0,
  users: [],
  currentProject: {},
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProjectId: action.payload.id,
        currentProject: action.payload
      };

    case LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};
