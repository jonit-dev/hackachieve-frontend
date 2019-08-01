/*#############################################################|
|                        REDUCERS
*##############################################################*/

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import alertReducer from "./UI/alertReducer";
import goalReducer from "./goalReducer";
import uiReducer from "./UI/uiReducer";
import checklistReducer from "./checklistReducer";
import goalLabelsReducers from "./goalLabelsReducers";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";

import tagReducer from "./tagReducer";
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  alert: alertReducer,
  goal: goalReducer,
  ui: uiReducer,
  checklist: checklistReducer,
  tags: tagReducer,
  labels: goalLabelsReducers,
  projects: projectReducer,
  tasks: taskReducer
});
