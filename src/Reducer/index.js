import { combineReducers } from "redux";
import authReducer from './auth';
import taskReducer from './tasks';

export default combineReducers({
    auth: authReducer,
    tasks: taskReducer
});