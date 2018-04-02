/*
The redux registration reducer manages the registration section of the application state,
as you can see there isn't much to it, on registration request it just sets a registering
flag set to true which the RegisterPage uses to show the loading spinner.
On register success or failure it clears the registration state.
*/
import { authenticationConstants } from '../_actions/authentication.actions';

const registration = (state = {}, action) => {
    switch (action.type) {
        case authenticationConstants.REGISTER_REQUEST:
            return { registering: true };
        case authenticationConstants.REGISTER_SUCCESS:
        case authenticationConstants.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
};

export default registration;