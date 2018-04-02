/*
Contains Redux action creators for actions related to alerts / toaster
notifications in the application.
For example to display a success alert message with the text
'Registration Successful' you can call
dispatch(alertActions.success('Registration successful'));.
*/
const alertConstants = {
    SUCCESS: "ALERTS_SUCCESS",
    ERROR: "ALERTS_ERROR",
    CLEAR: "ALERTS_CLEAR",
};

const success = (message) => ({ type: alertConstants.SUCCESS, message });

const error = (message) => ({ type: alertConstants.ERROR, message });

const clear = () => ({ type: alertConstants.CLEAR });

const alertActions = {
    success,
    error,
    clear
};

export {
    alertActions,
    alertConstants
};
