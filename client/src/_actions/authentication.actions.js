/*
Contains Redux action creators for actions related to users.
Public action creators are exposed via the userActions object.

Most of the actions for users are async actions that are made up of multiple sub actions,
this is because they have to make an http request and wait for the response before completing.
Async actions typically dispatch a request action before performing an async task
(e.g. an http request), and then dispatch a success or error action based on the result of the
async task.

For example the login() action creator performs the following steps:
* dispatches a LOGIN_REQUEST action with dispatch(request({ username }));
* calls the async task authentication.login(username, password)
* dispatches a LOGIN_SUCCESS with dispatch(success(user)); if login was successful,
  or dispatches a LOGIN_FAILURE action with dispatch(failure(error)); if login failed.

To keep the code tidy I've put sub action creators into nested functions within each async
action creator function.

For example the login() function contains 3 nested action creator functions for request(),
success() and failure() that return the actions LOGIN_REQUEST, LOGIN_SUCCESS and LOGIN_FAILURE
respectively.

Putting the sub action creators into nested functions also allows me to give them standard
names like request, success and failure without clashing with other function names because
they only exist within the scope of the parent function.
*/

import authenticationAPI from '../_api/authentication.api';
import { alertActions } from './alert.actions';
import history from '../_helpers/history';


const authenticationConstants = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    REGISTER_REQUEST: "REGISTER_REQUEST",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAILURE: "REGISTER_SUCCESS",
};

const login = (username, password) => {
    const request = (user) => ({ type: authenticationConstants.LOGIN_REQUEST, user });
    const success = (user) => ({ type: authenticationConstants.LOGIN_SUCCESS, user });
    const failure = (error) => ({ type: authenticationConstants.LOGIN_FAILURE, error });

    return dispatch => {
        dispatch(request({ username }));

        authenticationAPI
        .login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
};

const logout = () => {
    authenticationAPI.logout();
    return { type: authenticationConstants.LOGOUT };
};


const authenticationActions = { login, logout };

export {
    authenticationActions,
    authenticationConstants
};