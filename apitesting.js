/*
 * API TESTING FOR QA ENGINEERS
 *
 * An API test sends a request and verifies the response against the
 * requirement. A QA engineer normally checks:
 *
 * 1. Status code       - Did the operation succeed or fail correctly?
 * 2. Response body     - Are the returned values correct?
 * 3. Response headers  - Is the content type and security information correct?
 * 4. Response time     - Is the endpoint fast enough for the requirement?
 * 5. Negative cases    - Does invalid input produce a useful error?
 * 6. Authentication    - Are protected endpoints really protected?
 *
 * This file uses a mock server instead of a real server. That makes the
 * examples repeatable and prevents the practice code from creating real data.
 *
 * Run with Node.js 18+:
 *     node apitesting.js
 */

const assert = require('assert');

/*
 * A small wrapper used by tests.
 *
 * Keeping request handling in one function means every endpoint test checks
 * errors consistently. In a real project, this could be a shared API client.
 */
async function request(fetchImplementation, url, options = {}) {
    const response = await fetchImplementation(url, options);

    // fetch() does not reject automatically for HTTP 400 or 500 responses.
    // The test must inspect response.ok or response.status itself.
    const body = await response.json();

    return {
        status: response.status,
        headers: response.headers,
        body
    };
}

/*
 * Fake API responses used for local tests.
 *
 * A mock is useful when:
 * - the real API is unavailable,
 * - test data must be predictable, or
 * - the test should not modify a shared environment.
 */
function createMockFetch() {
    const calls = [];

    const fetchImplementation = async (url, options = {}) => {
        calls.push({ url, options });

        if (url === '/users/1' && options.method !== 'POST') {
            return {
                status: 200,
                headers: { 'content-type': 'application/json' },
                json: async () => ({ id: 1, name: 'Ayan', role: 'qa-engineer' })
            };
        }

        if (url === '/users' && options.method === 'POST') {
            const user = JSON.parse(options.body);

            if (!user.name || !user.email) {
                return {
                    status: 400,
                    headers: { 'content-type': 'application/json' },
                    json: async () => ({
                        error: 'name and email are required'
                    })
                };
            }

            return {
                status: 201,
                headers: {
                    'content-type': 'application/json',
                    location: '/users/2'
                },
                json: async () => ({ id: 2, ...user })
            };
        }

        if (url === '/private/profile' && !options.headers?.Authorization) {
            return {
                status: 401,
                headers: { 'content-type': 'application/json' },
                json: async () => ({ error: 'authentication is required' })
            };
        }

        return {
            status: 404,
            headers: { 'content-type': 'application/json' },
            json: async () => ({ error: 'route not found' })
        };
    };

    return { calls, fetchImplementation };
}

/*
 * Example 1: GET test
 *
 * GET is mainly used to read data. A QA test should check both the status code
 * and important fields in the response, not only whether a response arrived.
 */
async function testGetUser(fetchImplementation) {
    const result = await request(fetchImplementation, '/users/1', {
        method: 'GET'
    });

    assert.strictEqual(result.status, 200); // 200 means the request succeeded.
    assert.strictEqual(
        result.headers['content-type'],
        'application/json'
    ); // The API returned JSON.
    assert.strictEqual(result.body.id, 1); // Verify the requested user.
    assert.strictEqual(result.body.role, 'qa-engineer');
}

/*
 * Example 2: POST test
 *
 * POST is used to create data. The normal success status is 201 Created.
 * The request body must be JSON and the Content-Type header must say so.
 */
async function testCreateUser(fetchImplementation, calls) {
    const result = await request(fetchImplementation, '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Mina',
            email: 'mina@example.com'
        })
    });

    assert.strictEqual(result.status, 201); // 201 means a resource was created.
    assert.strictEqual(result.body.name, 'Mina');
    assert.strictEqual(result.headers.location, '/users/2');

    // Verify that the client sent the right HTTP method and payload.
    assert.strictEqual(calls[1].options.method, 'POST');
    assert.strictEqual(
        JSON.parse(calls[1].options.body).email,
        'mina@example.com'
    );
}

/*
 * Example 3: Negative test
 *
 * A good QA suite also proves that invalid input is rejected. This prevents
 * bugs such as saving incomplete users in the database.
 */
async function testInvalidCreateUser(fetchImplementation) {
    const result = await request(fetchImplementation, '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Missing email' })
    });

    assert.strictEqual(result.status, 400); // 400 means invalid request data.
    assert.match(result.body.error, /email is required/);
}

/*
 * Example 4: Authentication test
 *
 * A protected endpoint should reject a request without credentials. Never
 * hard-code a real token in source code; use environment variables in a real
 * test suite, for example process.env.API_TOKEN.
 */
async function testAuthentication(fetchImplementation) {
    const result = await request(fetchImplementation, '/private/profile', {
        method: 'GET'
    });

    assert.strictEqual(result.status, 401); // 401 means authentication is missing.
}

/*
 * A tiny test runner.
 *
 * In production, tools such as Playwright, Jest, Postman/Newman, or
 * RestAssured can provide richer reporting. The testing ideas remain the same:
 * arrange the request, act by sending it, and assert the result.
 */
async function runApiTests() {
    const { calls, fetchImplementation } = createMockFetch();
    const tests = [
        ['GET returns a user', () => testGetUser(fetchImplementation)],
        [
            'POST creates a user',
            () => testCreateUser(fetchImplementation, calls)
        ],
        [
            'POST rejects incomplete data',
            () => testInvalidCreateUser(fetchImplementation)
        ],
        [
            'Protected endpoint rejects missing authentication',
            () => testAuthentication(fetchImplementation)
        ]
    ];

    let passed = 0;

    for (const [name, test] of tests) {
        try {
            await test();
            console.log(`PASS: ${name}`);
            passed += 1;
        } catch (error) {
            console.error(`FAIL: ${name}`);
            console.error(`      ${error.message}`);
        }
    }

    console.log(`\n${passed}/${tests.length} API tests passed`);

    // A non-zero exit code makes CI mark the test job as failed.
    if (passed !== tests.length) {
        process.exitCode = 1;
    }
}

/*
 * Real API request shape (do not run against production without permission):
 *
 * const response = await fetch('https://api.example.com/users/1', {
 *     method: 'GET',
 *     headers: {
 *         Accept: 'application/json',
 *         Authorization: `Bearer ${process.env.API_TOKEN}`
 *     }
 * });
 *
 * Common status codes to remember:
 * 200 OK, 201 Created, 204 No Content,
 * 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found,
 * 409 Conflict, and 500 Internal Server Error.
 */

module.exports = {
    createMockFetch,
    request,
    runApiTests,
    testAuthentication,
    testCreateUser,
    testGetUser,
    testInvalidCreateUser
};

if (require.main === module) {
    runApiTests();
}