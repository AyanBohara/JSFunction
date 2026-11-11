/*
 * AUTOMATION TESTING CONCEPTS
 *
 * This file is a small, dependency-free example of common concepts.
 * Real projects usually use tools such as Playwright, Selenium, Cypress,
 * Jest, Mocha, or WebdriverIO.
 */

// 1. Test data: reusable input values for a test.
const validUser = {
  username: "test.user@example.com",
  password: "Password123!",
};

// 2. Application code under test.
function login(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  return {
    success: username.includes("@") && password.length >= 8,
    token: "fake-test-token",
  };
}

// 3. Assertion: compare the actual result with the expected result.
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, received ${actual}`);
  }
}

// 4. Test case: one test with a clear setup, action, and verification.
async function shouldLoginWithValidCredentials() {
  // Arrange: prepare the test data and environment.
  const { username, password } = validUser;

  // Act: perform the action being tested.
  const response = await Promise.resolve(login(username, password));

  // Assert: verify the expected behavior.
  assertEqual(response.success, true, "Valid login should succeed");
}

// 5. Negative testing: verify that invalid input is rejected.
function shouldRejectMissingPassword() {
  try {
    login(validUser.username, "");
    throw new Error("The test should have failed for a missing password");
  } catch (error) {
    // Error handling is an assertion for the negative test.
    assertEqual(
      error.message,
      "Username and password are required",
      "Missing password should be rejected",
    );
  }
}

// 6. Boundary testing: check values at the limits of valid input.
function shouldCheckPasswordBoundary() {
  assertEqual(login("user@example.com", "12345678").success, true,
    "Eight-character password should be accepted");
  assertEqual(login("user@example.com", "1234567").success, false,
    "Seven-character password should be rejected");
}

// 7. Test hooks: setup and cleanup commonly run before and after tests.
async function beforeEach() {
  console.log("Set up browser, page, test data, or API client");
}

async function afterEach() {
  console.log("Close browser, clear data, and collect failure evidence");
}

// 8. Test suite: a group of related test cases.
async function runTest(testName, testFunction) {
  await beforeEach();

  try {
    await testFunction();
    console.log(`PASS: ${testName}`);
  } catch (error) {
    // Test reporting should expose failures instead of hiding them.
    console.error(`FAIL: ${testName} - ${error.message}`);
  } finally {
    await afterEach();
  }
}

async function runTestSuite() {
  // 9. Smoke testing: quickly verify that the main feature works.
  await runTest("valid login", shouldLoginWithValidCredentials);

  // 10. Regression testing: ensure existing behavior remains correct.
  await runTest("missing password validation", shouldRejectMissingPassword);

  // 11. Edge and boundary testing: verify unusual or limit values.
  await runTest("password length boundary", shouldCheckPasswordBoundary);
}

// 12. Asynchronous automation:
// async returns a Promise, and await waits for asynchronous work to finish.
// In browser automation, await is used for navigation, clicks, and assertions.
runTestSuite().then(() => {
  console.log("Test suite completed");
});

/*
 * OTHER IMPORTANT AUTOMATION TESTING CONCEPTS
 *
 * - Test scenario: a high-level behavior to verify.
 * - Test plan: scope, risks, schedule, tools, and responsibilities.
 * - Test environment: browser, operating system, database, and test server.
 * - Test data: inputs, users, files, API payloads, and database records.
 * - Locator: a selector used to find a UI element, such as CSS or XPath.
 * - Wait/synchronization: waiting for elements or network requests to finish.
 * - Page Object Model: keeping page locators and actions in page classes.
 * - Data-driven testing: running the same test with multiple data sets.
 * - Keyword-driven testing: describing actions with reusable keywords.
 * - BDD: expressing behavior as Given, When, and Then.
 * - API testing: checking requests, responses, headers, status codes, and schemas.
 * - Database testing: checking stored data, CRUD operations, and relationships.
 * - Mocking/stubbing: replacing external services with controlled test doubles.
 * - Regression testing: rerunning tests after a code change.
 * - Retesting: verifying that a specific defect fix works.
 * - Parallel testing: running independent tests at the same time.
 * - Cross-browser testing: testing Chrome, Firefox, Safari, and Edge.
 * - Headless testing: running a browser without displaying its user interface.
 * - CI/CD: running automated tests in GitHub Actions, Jenkins, or GitLab CI.
 * - Test report: recording passed, failed, skipped, duration, and failure details.
 * - Screenshot/trace/video: evidence collected when a UI test fails.
 * - Flaky test: a test that passes and fails without a product-code change.
 * - Test isolation: each test starts with predictable, independent state.
 * - Test coverage: the amount of code or behavior exercised by tests.
 * - Severity: impact of a defect; priority: urgency to fix it.
 * - Smoke testing: broad, shallow checks of critical functionality.
 * - Sanity testing: focused checks after a small change.
 * - Performance testing: checking response time, load, and scalability.
 * - Accessibility testing: checking keyboard use, labels, and screen readers.
 * - Visual regression testing: detecting unexpected UI appearance changes.
 */