import loginUserReducer from './loginUser';
import usersReducer from './users';
import { combineReducers } from 'redux';

export default combineReducers({
	loginUser: loginUserReducer,
	users: usersReducer,
});
