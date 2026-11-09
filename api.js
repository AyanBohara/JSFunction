/*
 * API testing practice
 *
 * API testing checks that an endpoint:
 * 1. returns the expected HTTP status,
 * 2. returns data in the expected format, and
 * 3. handles errors correctly.
 *
 * Run this file with:
 *     node api.js
 */

async function getUser(fetchImplementation, userId) {
    const response = await fetchImplementation(
        `https://api.example.com/users/${userId}`
    );

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but received ${actual}`);
    }
}

function assertDeepEqual(actual, expected) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
            `Expected ${JSON.stringify(expected)}, but received ${JSON.stringify(actual)}`
        );
    }
}

function createMockFetch(response) {
    return async () => response;
}

async function runApiTests() {
    let passed = 0;

    const runTest = async (name, callback) => {
        try {
            await callback();
            console.log(`PASS: ${name}`);
            passed += 1;
        } catch (error) {
            console.error(`FAIL: ${name}`);
            console.error(error.message);
        }
    };

    await runTest('checks a successful response and JSON body', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: async () => ({ id: 1, name: 'Ayan' })
        };

        const user = await getUser(createMockFetch(mockResponse), 1);

        assertEqual(mockResponse.status, 200);
        assertDeepEqual(user, { id: 1, name: 'Ayan' });
    });

    await runTest('reports an unsuccessful response', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
            json: async () => ({ message: 'User not found' })
        };

        try {
            await getUser(createMockFetch(mockResponse), 999);
            throw new Error('Expected the request to fail');
        } catch (error) {
            assertEqual(error.message, 'Request failed with status 404');
        }
    });

    console.log(`\n${passed}/2 API tests passed`);
}

module.exports = {
    assertDeepEqual,
    assertEqual,
    getUser,
    runApiTests
};

if (require.main === module) {
    runApiTests().catch((error) => {
        console.error('API tests failed:', error.message);
        process.exitCode = 1;
    });
}