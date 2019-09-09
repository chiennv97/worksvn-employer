import { combineReducers } from 'redux';
import UserReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
    token: UserReducer,
    data: dataReducer
});

export default reducer;
