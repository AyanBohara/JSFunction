/*
 * HTTP API CONCEPTS
 *
 * An API (Application Programming Interface) allows one program to
 * communicate with another program. A REST API usually uses HTTP methods
 * to work with resources such as users, products, or posts.
 *
 * Example base URL:
 *     https://api.example.com/users
 *
 * The examples below use fetch(). fetch() is available in modern browsers
 * and in Node.js 18 or newer.
 */

/*
 * 1. GET - READ DATA
 *
 * GET is used to retrieve data. It should not change data on the server.
 *
 * Common examples:
 *     GET /users          -> get all users
 *     GET /users/10       -> get user with ID 10
 *     GET /users?role=admin -> filter users with query parameters
 */
async function getUsers() {
    const response = await fetch('https://api.example.com/users');

    // response.ok is true for status codes from 200 through 299.
    if (!response.ok) {
        throw new Error(`GET failed: ${response.status}`);
    }

    // json() converts the response body from JSON text into JavaScript data.
    return response.json();
}

/*
 * 2. POST - CREATE DATA
 *
 * POST sends data to the server to create a new resource.
 *
 * The request body is usually JSON. The Content-Type header tells the
 * server how to read the body.
 */
async function createUser(user) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`POST failed: ${response.status}`);
    }

    // A successful POST commonly returns status 201 (Created).
    return response.json();
}

/*
 * Example:
 *     createUser({ name: 'Ayan', email: 'ayan@example.com' });
 */

/*
 * 3. PUT - REPLACE DATA
 *
 * PUT normally replaces the complete resource at the specified URL.
 * Send all important fields when using PUT.
 */
async function replaceUser(userId, user) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`PUT failed: ${response.status}`);
    }

    return response.json();
}

/*
 * 4. PATCH - PARTIALLY UPDATE DATA
 *
 * PATCH changes only the fields included in the request body.
 * It is useful when you do not want to send the complete resource.
 */
async function updateUserName(userId, name) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        throw new Error(`PATCH failed: ${response.status}`);
    }

    return response.json();
}

/*
 * 5. DELETE - REMOVE DATA
 *
 * DELETE removes a resource. A successful DELETE may return:
 *     200 OK    with a response body
 *     204 No Content with no response body
 */
async function deleteUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`DELETE failed: ${response.status}`);
    }

    // Do not call response.json() when the server returns 204.
    return response.status === 204 ? null : response.json();
}

/*
 * 6. HEAD - CHECK RESOURCE INFORMATION
 *
 * HEAD works like GET, but the server returns headers without a body.
 * It can be used to check whether a resource exists or to inspect its size.
 */
async function checkUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'HEAD'
    });

    return {
        exists: response.ok,
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length')
    };
}

/*
 * 7. OPTIONS - ASK WHAT IS ALLOWED
 *
 * OPTIONS asks the server which methods or headers are supported.
 * Browsers also use OPTIONS automatically for some CORS preflight requests.
 */
async function getAllowedMethods() {
    const response = await fetch('https://api.example.com/users', {
        method: 'OPTIONS'
    });

    return response.headers.get('allow');
}

/*
 * IMPORTANT HTTP STATUS CODES
 *
 * 200 OK           - Request succeeded.
 * 201 Created      - A resource was created, usually after POST.
 * 204 No Content   - Request succeeded without a response body.
 * 400 Bad Request  - The request data is invalid.
 * 401 Unauthorized - Authentication is required or invalid.
 * 403 Forbidden    - The user is authenticated but not allowed.
 * 404 Not Found    - The requested resource does not exist.
 * 409 Conflict     - The request conflicts with current server data.
 * 500 Server Error - The server failed while handling the request.
 */

/*
 * COMMON REQUEST PARTS
 *
 * URL:
 *     https://api.example.com/users/10?active=true
 *     - /users/10 is the path.
 *     - active=true is a query parameter.
 *
 * Method:
 *     GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS.
 *
 * Headers:
 *     Metadata such as the content type and authentication token.
 *
 * Body:
 *     Data sent to the server, commonly with POST, PUT, and PATCH.
 *
 * Authentication example:
 *     headers: {
 *         Authorization: `Bearer ${token}`
 *     }
 */

module.exports = {
    checkUser,
    createUser,
    deleteUser,
    getAllowedMethods,
    getUsers,
    replaceUser,
    updateUserName
};