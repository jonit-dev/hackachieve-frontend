/*#############################################################|
|                        REDUCERS
*##############################################################*/

import {combineReducers} from 'redux'
import authReducer from './authReducer';
import {reducer as formReducer} from 'redux-form';
import alertReducer from "./UI/alertReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    alert: alertReducer
});



