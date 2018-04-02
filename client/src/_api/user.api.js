import handleResponse from '../_helpers/handleResponse';
import authHeader from '../_helpers/authHeader';


const register = (user) =>
    fetch('/users/register', {
        method: 'POST',
        headers: {
            'ContentType': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(handleResponse);

const getById = (id) =>
    fetch('/users/' + id, {
        method: 'GET',
        headers: authHeader()
    }).then(handleResponse);

const getAll = () => 
    fetch('/users', {
        method: 'GET',
        headers: authHeader()
    }).then(handleResponse);

const update = (user) =>
    fetch('/users/' + user.id, {
        method: 'PUT',
        headers: {
            ...authHeader(),
            ContentType: 'application/json'
        },
        body: JSON.stringify(user)
    }).then(handleResponse);

// prefixed const name =  with underscore because delete is a reserved word in javascrip=> t
const _delete = (id) =>
    fetch('/users/' + id, {
        method: 'DELETE',
        headers: authHeader()
    }).then(handleResponse);

const userAPI = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

export default userAPI;
