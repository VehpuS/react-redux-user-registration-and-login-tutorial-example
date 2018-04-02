/*
The redux alert reducer manages the application state for alerts / toaster notifications,
it updates state when an alert action is dispatched from anywhere in the application,
for example when an alertConstants.SUCCESS action is dispatched, the reducer updates the alert
state to an object with type: 'alert-success' and message: action.message.
*/
import { alertConstants } from '../_actions/alert.actions';
const alert = (state = {}, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: alertConstants.SUCCESS,
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: alertConstants.ERROR,
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
};

export default alert;