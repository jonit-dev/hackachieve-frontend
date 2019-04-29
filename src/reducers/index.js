/*#############################################################|
|                        REDUCERS
*##############################################################*/

import {combineReducers} from 'redux'
import authReducer from './authReducer';
import {reducer as formReducer} from 'redux-form';
import alertReducer from "./UI/alertReducer";
import goalReducer from './goalReducer';
import uiReducer from './UI/uiReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    alert: alertReducer,
    goal: goalReducer,
    ui: uiReducer
});



