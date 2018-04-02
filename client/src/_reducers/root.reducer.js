import { combineReducers } from 'redux';

import registration from '../_reducers/registration.reducer';
import user from '../_reducers/user.reducer';
import authentication from '../_reducers/authentication.reducer';
import alert from '../_reducers/alert.reducer';

const rootReducer = combineReducers({
    registration,
    user,
    authentication,
    alert
});

export default rootReducer;
