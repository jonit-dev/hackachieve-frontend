import {
  LOAD_GOALS,
  FILTER_GOALS,
  UPDATE_LONG_TERM_GOAL_STATE,
  FILE_UPLOAD_SUCCESS,
  CLEAR_FILE_UPLOAD,
  SET_FILE_UPLOADING,
  ATTACH_UPLOAD_SUCCESS,
  CLEAR_ATTACH_UPLOAD_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  goals: null,
  filter: "All",
  uploadFile:{},
  type:"",
  loading:false,
  fileUploadingStatus:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GOALS:
      const goals = action.payload.board;

      return {
        ...state,
        goals: goals
      };
    case FILTER_GOALS:
      return {
        ...state,
        filter: action.payload.category
      };

    case UPDATE_LONG_TERM_GOAL_STATE:
      const { longTermGoalId, newLongTermGoal } = action.payload;

      // console.log(`updating long term goal id ${longTermGoalId}`);

      let stateCopy = state.goals.map(board => {
        if (board.long_term_goals.find(ltg => ltg.id === longTermGoalId)) {
          board.long_term_goals.short_term_goals =
            newLongTermGoal.short_term_goals;
        }

        return board;
      });

      return {
        ...state,
        goals: stateCopy
      };


      

    case CLEAR_FILE_UPLOAD:
      return {
        ...state,
        fileUploadingStatus:false,
        uploadFile:{},
        type:""
      };
    case CLEAR_ATTACH_UPLOAD_SUCCESS:
        return {
          ...state,
          fileUploadingStatus:false,
          type:""
        };
    case ATTACH_UPLOAD_SUCCESS:
        return {
          ...state,
          uploadFile:{},
          type:ATTACH_UPLOAD_SUCCESS
        };
      
    case SET_FILE_UPLOADING:
      return {
        ...state,
        fileUploadingStatus:true
      };

    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadFile: action.payload,
        type:FILE_UPLOAD_SUCCESS
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
