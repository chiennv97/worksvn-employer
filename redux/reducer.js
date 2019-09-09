import { combineReducers } from 'redux';
import UserReducer from './reducers/userReducer';

const reducer = combineReducers({
    user: UserReducer,
});

export default reducer;
