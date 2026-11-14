/*
 * BEGINNER API TESTING WITH POSTMAN
 *
 * This file is meant to be pasted into the "Tests" tab in Postman.
 *
 * Before running the tests:
 * 1. Create a new request in Postman.
 * 2. Select the GET method.
 * 3. Use this URL:
 *      https://jsonplaceholder.typicode.com/posts/1
 * 4. Open the "Tests" tab and paste this file there.
 * 5. Click "Send".
 *
 * The API sends back one post as JSON. Postman runs the code below after
 * receiving the response. Every pm.test() block is one small test.
 */

/*
 * pm.test() creates a named test.
 *
 * The first argument is the test name that appears in Postman's test report.
 * The second argument is a function containing the checks to perform.
 *
 * If an expectation fails, Postman marks that test as failed.
 */
pm.test('The API returns status code 200', function () {
    // 200 OK means the server successfully handled the GET request.
    pm.response.to.have.status(200);
});

/*
 * An API should respond within an acceptable time.
 *
 * The limit depends on the project. One second is used here only as a
 * beginner-friendly example, not as a rule for every real API.
 */
pm.test('The response arrives within one second', function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

/*
 * Headers contain extra information about the response.
 * The content type tells us that the body is JSON.
 */
pm.test('The response is JSON', function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include(
        'application/json'
    );
});

/*
 * pm.response.json() converts the response body from JSON text into a
 * JavaScript object, so we can read values such as response.id.
 */
const responseBody = pm.response.json();

pm.test('The response contains the expected post', function () {
    // Check that important properties exist.
    pm.expect(responseBody).to.have.property('id');
    pm.expect(responseBody).to.have.property('userId');
    pm.expect(responseBody).to.have.property('title');
    pm.expect(responseBody).to.have.property('body');

    // Check the value of the post requested by /posts/1.
    pm.expect(responseBody.id).to.eql(1);
});

/*
 * We can also check the data type. This catches errors such as an API
 * returning "1" as text when the application expects 1 as a number.
 */
pm.test('The post id is a number', function () {
    pm.expect(responseBody.id).to.be.a('number');
});

/*
 * console.log() prints information in Postman's console.
 * Open View > Show Postman Console when you want to inspect it.
 */
console.log('Returned post:', responseBody);

/*
 * COMMON STATUS CODES
 *
 * 200 OK           - The request succeeded.
 * 201 Created      - A new resource was created.
 * 400 Bad Request  - The request data is invalid.
 * 401 Unauthorized - Login or a token is required.
 * 403 Forbidden    - The user is not allowed to perform the action.
 * 404 Not Found    - The requested resource does not exist.
 * 500 Server Error - Something failed on the server.
 *
 * HOW API TESTING WORKS
 *
 * 1. Send a request to an endpoint.
 * 2. Receive the response from the server.
 * 3. Check the status, headers, response time, and body.
 * 4. Pass when the actual result matches the expected result.
 * 5. Fail when the result is different, so the problem can be investigated.
 *
 * For a POST, PUT, or PATCH request, the same idea is used. Add a request
 * body in Postman's "Body" tab, then test the expected status and returned
 * values. For example:
 *
 * pm.test('A user was created', function () {
 *     pm.response.to.have.status(201);
 *     const createdUser = pm.response.json();
 *     pm.expect(createdUser).to.have.property('id');
 * });
 */