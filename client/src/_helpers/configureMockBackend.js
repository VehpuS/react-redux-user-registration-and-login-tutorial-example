// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

const simulateAuthenticatePOST = (url, opts, resolve, reject) => {
    // get parameters from post request
    let params = JSON.parse(opts.body);

    // find if any user matches login credentials
    let filteredUsers = users.filter(user => {
        return user.username === params.username && user.password === params.password;
    });

    if (filteredUsers.length) {
        // if login details are valid return user details and fake jwt token
        let user = filteredUsers[0];
        let responseJson = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        };
        resolve({ ok: true, json: () => responseJson });
    } else {
        // else return error
        reject('Username or password is incorrect');
    }

    return;
};

const simulateUsersGET = (url, opts, resolve, reject) => {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
        resolve({ ok: true, json: () => users });
    } else {
        // return 401 not authorised if token is null or invalid
        reject('Unauthorised');
    }

    return;
};

const simulateUserIdGET = (url, opts, resolve, reject) => {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
        // find user by id in users array
        let urlParts = url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = users.filter(user => { return user.id === id; });
        let user = matchedUsers.length ? matchedUsers[0] : null;

        // respond 200 OK with user
        resolve({ ok: true, json: () => user });
    } else {
        // return 401 not authorised if token is null or invalid
        reject('Unauthorised');
    }

    return;
};

const simulateUserRegisterPOST = (url, opts, resolve, reject) => {
    // get new user object from post body
    let newUser = JSON.parse(opts.body);

    // validation
    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
    if (duplicateUser) {
        reject('Username "' + newUser.username + '" is already taken');
        return;
    }

    // save new user
    newUser.id = Math.max(0, ...users.map(user => user.id)) + 1;
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // respond 200 OK
    resolve({ ok: true, json: () => ({}) });

    return;
}

const simulateUserIdDelete = (url, opts, resolve, reject) => {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
        // find user by id in users array
        const urlParts = url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem('users', JSON.stringify(users));
                break;
            }
        }

        // respond 200 OK
        resolve({ ok: true, json: () => ({}) });
    } else {
        // return 401 not authorised if token is null or invalid
        reject('Unauthorised');
    }

    return;
};

const simulateAPI = (realFetch, url, opts, resolve, reject) => {
    // authenticate
    if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
        console.log("Mocking authenticate");
        return simulateAuthenticatePOST(url, opts, resolve, reject);
    }

    // get users
    if (url.endsWith('/users') && opts.method === 'GET') {
        console.log("Mocking get users");
        return simulateUsersGET(url, opts, resolve, reject);
    }

    // get user by id
    if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
        console.log("Mocking get user by id");
        return simulateUserIdGET(url, opts, resolve, reject);
    }

    // register user
    if (url.endsWith('/users/register') && opts.method === 'POST') {
        console.log("Mocking register user");
        return simulateUserRegisterPOST(url, opts, resolve, reject);
    }

    // delete user
    if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
        console.log("Mocking delete user");
        return simulateUserIdDelete(url, opts, resolve, reject);
    }

    // pass through any requests not handled above
    console.log("Passing through request to original fetch");
    return realFetch(url, opts).then(
        response => resolve(response)
    );
}
const simulateFetch = (realFetch) => (url, opts) => {
    console.log(`Mocking ${opts.method} call to ${url}`);
    return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        console.log("Simulating async request");
        setTimeout(() => simulateAPI(realFetch, url, opts, resolve, reject), 1000);
    });
}

const configureMockBackend = () => {
    const realFetch = window.fetch;
    window.fetch = simulateFetch(realFetch);
};

export default configureMockBackend;