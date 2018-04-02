const handleResponse = (response) => {
    return (!response.ok) ?
        Promise.reject(response.statusText) :
        response.json();
}

export default handleResponse
