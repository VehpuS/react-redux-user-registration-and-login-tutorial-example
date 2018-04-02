import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const login = (username, password) =>
    fetch('/users/authenticate', {
        method: 'POST',
        headers: {
            'ContentType': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response =>
        (!response.ok) ?
            Promise.reject(response.statusText) :
            response.json()
    ).then(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between pag
            localStorage.setItem('user', JSON.stringify(user)) ;
        }
        return user;
    });

// remove user from local storage to log user out
const logout = () => localStorage.removeItem('user');

const authenticationAPI = {
    login,
    logout,
};

export default authenticationAPI;
