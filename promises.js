/*
 * Promises practice
 *
 * Run this file with:
 *     node promises.js
 *
 * Import the functions in a test with:
 *     const { delay, checkAge, doubleAfterDelay } = require('./promises');
 */

function delay(milliseconds, value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), milliseconds);
    });
}

function checkAge(age) {
    return delay(10).then(() => {
        if (age < 18) {
            throw new Error('Invalid age');
        }

        return 'You can vote';
    });
}

function doubleAfterDelay(number) {
    return delay(10, number * 2);
}

function getUser() {
    return delay(20, { id: 1, name: 'Ayan' });
}

function getCourses() {
    return delay(30, ['JavaScript', 'Node.js']);
}

async function runExamples() {
    // 1. Resolving a Promise
    const message = await Promise.resolve('Promise completed');
    console.log('1.', message);

    // 2. Handling a rejected Promise
    try {
        await Promise.reject(new Error('Something went wrong'));
    } catch (error) {
        console.log('2.', error.message);
    }

    // 3. finally() runs after either success or failure
    await delay(10)
        .then(() => console.log('3. Finished waiting'))
        .finally(() => console.log('3. Cleanup complete'));

    // 4. Chaining Promises
    const chainedResult = await delay(10, 'Step 1 result')
        .then((result) => {
            console.log('4.', result);
            return 'Step 2 result';
        });
    console.log('4.', chainedResult);

    // 5. Promise.all() waits for every Promise
    const [user, courses] = await Promise.all([getUser(), getCourses()]);
    console.log('5. User:', user);
    console.log('5. Courses:', courses);

    // 6. Promise.race() returns the first settled Promise
    const fastestResult = await Promise.race([
        delay(30, 'Slow result'),
        delay(10, 'Fast result')
    ]);
    console.log('6.', fastestResult);

    // 7. async/await is another way to use Promises
    console.log('7.', await delay(10, 'Message loaded with async/await'));

    // 8. Promise.allSettled() keeps both successful and failed results
    const results = await Promise.allSettled([
        checkAge(21),
        checkAge(15)
    ]);
    console.log(
        '8.',
        results.map((result) => result.status)
    );

    // 9. Small testable exercises
    console.log('Exercise 1:', await delay(10, 'Success'));
    console.log('Exercise 2:', await checkAge(21));
    console.log('Exercise 3:', await doubleAfterDelay(5));

    const [firstNumber, secondNumber] = await Promise.all([
        doubleAfterDelay(5),
        doubleAfterDelay(10)
    ]);
    console.log('Exercise 4:', firstNumber + secondNumber);
}

module.exports = {
    checkAge,
    delay,
    doubleAfterDelay,
    getCourses,
    getUser,
    runExamples
};

if (require.main === module) {
    runExamples().catch((error) => {
        console.error('Promise example failed:', error.message);
        process.exitCode = 1;
    });
}
