/*
The redux authentication reducer manages the state related to login (and logout) actions.
- On successful login the current user object and a loggedIn flag are stored in the
  authentication section of the application state.
- On logout or login failure the authentication state is set to an empty object.
- During login (between login request and success/failure) the authentication state has a
  loggingIn flag set to true and a user object with the details of the user that is attempting
  to login.
*/
import { authenticationConstants } from '../_actions/authentication.actions';

const localStorageUser = 'user';

let user = JSON.parse(localStorage.getItem(localStorageUser)) ;
const initialState = user ? { loggedIn: true, user } : {};
const authentication = (state = initialState, action) => {
    switch (action.type) {
        case authenticationConstants.LOGIN_REQUEST:
            return {
                loggingIn: false,
                user: action.user
            };
        case authenticationConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case authenticationConstants.LOGIN_FAILURE:
            return {};
        case authenticationConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}

export default authentication;