import { LOAD_TASKS, CREATE_TASK } from "../actions/types";

const INITIAL_STATE = {
  taskItems: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      return { ...state, taskItems: action.payload.task };

    case CREATE_TASK:
      const taskLength = state.taskItems.length;

      return {
        ...state,
        taskItems: [...state.taskItems, { ...action.payload }]
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
