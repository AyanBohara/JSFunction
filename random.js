// async makes a function return a Promise.
async function getMessage() {
  // await pauses this function until the Promise is complete.
  const message = await Promise.resolve("Hello, async/await!");

  return message;
}

// Use .then() to read the value returned by the async function.
getMessage().then((message) => {
  console.log(message);
});