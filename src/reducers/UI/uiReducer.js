import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_LOCATION,
  LOAD_CATEGORIES,
  CHANGE_BOARD_SHOW_GOAL,
  CHANGE_SELECTED_PANEL
} from "../../actions/types";

// This is a generic UI reducer to handle state related with location, etc...

const INITIAL_STATE = {
  location: { pathname: "/" },
  selectedPanel: "board",
  modals: {
    //controls opening and closing of modals
    shortTermGoal: {
      status: false,
      id: null
    },
    longTermGoal: {
      status: false,
      id: null
    },
    goalContent: {
      status: false,
      id: null
    },
    editShortTermGoal: {
      status: false,
      id: null
    },
    editLongTermGoal: {
      status: false,
      id: null
    },
    addProject: {
      status: false,
      id: null
    }
  },
  boardCategories: [],
  boardShowGoals: "all"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, location: action.payload };

    case OPEN_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.name]: {
            status: true,
            id: action.payload.id
          }
        }
      };

    case CLOSE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.name]: {
            status: false,
            id: action.payload.id
          }
        }
      };

    case LOAD_CATEGORIES:
      return {
        ...state,
        boardCategories: action.payload
      };

    case CHANGE_BOARD_SHOW_GOAL:
      return {
        ...state,
        boardShowGoals: action.payload
      };

    case CHANGE_SELECTED_PANEL:
      return {
        ...state,
        selectedPanel: action.payload
      };

    default:
      return state;
  }
};

/*

 =========  Safe state update in reducers =========

// From arrays
Removing: state.filter(element => element !== 'hi');
adding: [...state, 'hi'];
replacing: state.map(el => el === 'hi' ? 'bye': el);

//From objects
updating: {...state, name: 'Sam'};
adding: {...state, age: 30};
removing: {state, age: undefined }

*/
