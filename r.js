/*
 * Arrow functions in testing
 *
 * This small runner uses the same callback style found in Jest, Vitest,
 * and other JavaScript test frameworks.
 */

const tests = [];
const beforeEachHooks = [];
const afterEachHooks = [];

// Arrow functions are commonly used as the callback for a test.
const test = (name, callback) => {
    tests.push({ name, callback });
};

// Arrow functions also make short setup and cleanup callbacks readable.
const beforeEach = (callback) => {
    beforeEachHooks.push(callback);
};

const afterEach = (callback) => {
    afterEachHooks.push(callback);
};

const assertEqual = (actual, expected) => {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but received ${actual}`);
    }
};

const assertDeepEqual = (actual, expected) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
            `Expected ${JSON.stringify(expected)}, but received ${JSON.stringify(actual)}`
        );
    }
};

// Setup data can be shared by several tests.
let user;

beforeEach(() => {
    user = { name: 'Ayan', roles: ['student'] };
});

afterEach(() => {
    user = undefined;
});

test('an arrow function can be a simple test callback', () => {
    const add = (first, second) => first + second;

    assertEqual(add(2, 3), 5);
});

test('an arrow function can prepare test data with map', () => {
    const scores = [10, 20, 30];
    const doubledScores = scores.map((score) => score * 2);

    assertDeepEqual(doubledScores, [20, 40, 60]);
});

test('an arrow function can filter the values being tested', () => {
    const numbers = [1, 2, 3, 4];
    const evenNumbers = numbers.filter((number) => number % 2 === 0);

    assertDeepEqual(evenNumbers, [2, 4]);
});

test('an arrow function can act as a mock callback', () => {
    let wasSaved = false;
    const onSave = () => {
        wasSaved = true;
    };

    onSave();

    assertEqual(wasSaved, true);
});

test('setup hooks can provide fresh data for every test', () => {
    user.roles.push('admin');

    assertDeepEqual(user, {
        name: 'Ayan',
        roles: ['student', 'admin']
    });
});

test('an async arrow function can test a promise', async () => {
    const getMessage = async () => 'test complete';

    assertEqual(await getMessage(), 'test complete');
});

const runTests = async () => {
    let passed = 0;

    for (const { name, callback } of tests) {
        try {
            for (const hook of beforeEachHooks) {
                await hook();
            }

            await callback();

            for (const hook of afterEachHooks) {
                await hook();
            }

            console.log(`PASS: ${name}`);
            passed += 1;
        } catch (error) {
            console.error(`FAIL: ${name}`);
            console.error(error.message);
        }
    }

    console.log(`\n${passed}/${tests.length} tests passed`);
};

runTests();