/*
Contains Redux action creators for actions related to users.
Public action creators are exposed via the userAPI object.

Most of the actions for users are async actions that are made up of multiple sub actions,
this is because they have to make an http request and wait for the response before completing.
Async actions typically dispatch a request action before performing an async task
(e.g. an http request), and then dispatch a success or error action based on the result of the
async task.

To keep the code tidy sub action creators are nested functions within each async action creator.

For example the getAll() function contains 3 nested action creator functions for request(),
success() and failure() that return the actions GETALL_REQUEST, GETALL_SUCCESS and GETALL_FAILURE
respectively.
*/

import userAPI from '../_api/user.api';
import { alertActions } from './alert.actions';
import history from '../_helpers/history';


const userConstants = {
    REGISTER_REQUEST: "REGISTER_REQUEST",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAILURE: "REGISTER_FAILURE",
    GETID_REQUEST:    "GETID_REQUEST",
    GETID_SUCCESS:    "GETID_SUCCESS",
    GETID_FAILURE:    "GETID_FAILURE",
    GETALL_REQUEST:   "GETALL_REQUEST",
    GETALL_SUCCESS:   "GETALL_SUCCESS",
    GETALL_FAILURE:   "GETALL_FAILURE",
    DELETE_REQUEST:   "DELETE_REQUEST",
    DELETE_SUCCESS:   "DELETE_SUCCESS",
    DELETE_FAILURE:   "DELETE_FAILURE",
};

const register = (user) => {
    const request = (user) => ({ type: userConstants.REGISTER_REQUEST, user });
    const success = (user) => ({ type: userConstants.REGISTER_SUCCESS, user });
    const failure = (error) => ({ type: userConstants.REGISTER_FAILURE, error });
    console.log("Registering", user);
    return dispatch => {
        dispatch(request(user));
        userAPI.register(user)
            .then(
            user => {
                dispatch(success());
                history.push('/login') ;
                dispatch(alertActions.success('Registration successful')) ;
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error)) ;
            }
        );
    };
};

const getById = (id) => {
    const request = (id) => ({ type: userConstants.GETID_REQUEST, id });
    const success = (id) => ({ type: userConstants.GETID_SUCCESS, id });
    const failure = (id, error) => ({ type: userConstants.GETID_FAILURE, id, error });
    return dispatch => {
        dispatch(request(id));
        userAPI.getById(id)
            .then(
            user => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };
};

const getAll = () => {
    const request = () => ({ type: userConstants.GETALL_REQUEST });
    const success = (users) => ({ type: userConstants.GETALL_SUCCESS, users });
    const failure = (error) => ({ type: userConstants.GETALL_FAILURE, error });

    return dispatch => {
        dispatch(request());

        userAPI
        .getAll()
        .then(
            users => dispatch(success(users)),
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error))
            }
        );
    };
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
    const request = (id) => ({ type: userConstants.DELETE_REQUEST, id });
    const success = (id) => ({ type: userConstants.DELETE_SUCCESS, id });
    const failure = (id, error) => ({ type: userConstants.DELETE_FAILURE, id, error });
    return dispatch => {
        dispatch(request(id)) ;
        userAPI.delete(id)
            .then(
            user => {
                dispatch(success(id)) ;
            },
            error => {
                dispatch(failure(id, error)) ;
            }
        ) ;
    };
};

const userActions = {
    register,
    getById,
    getAll,
    delete: _delete,
};

export {
    userActions,
    userConstants
};