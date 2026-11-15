//Function Expression

var hero = function hero() {
    console.log('You are a main character')
}
hero();

//Function decleration
function a1() {
    console.log('Hello function');

}

//function expression
const a2 = function () {
    console.log('hello function2');
}

//Arrow function is same as a function
//a3 is arrow function flat arrow funcion
const a3 = () => {
    console.log('hello anpnymous');
}

//one liner function
const a4 = () => console.log('eh ok one line function');
a4();

//IFEI (immediately invoked function expression)
//this is immediately invoke expression function
(function () {
    console.log('hello immediate function');
})()

console.log('Hamile 2 ta IFEI ek paxi arko launa paudaina');

//what is anonymous function
// Functrion wich doesnt have name

//if we use IIFE 2 times without other code then it will return me an error
(() => {
    console.log('Hello another IFEI');
})()


// Understanding the return keyword
// This is one of the most important concepts in JavaScript functions.

// So far, we've used console.log() to display results.

// But what if we want to calculate something and use that result somewhere else?

// That's where return comes in.

function addNumbers(a, b) {
    return a + b;  //return sends a result back to the place where the function was called.
}

const result = addNumbers(10, 20); //The returned value 30 is stored inside the result variable.

console.log(result);

// Function type	        Example
// Function declaration	    function greet() {}
// Function expression	    const greet = function() {};
// Arrow function	        const greet = () => {};
// Anonymous function	    function() {}
// Callback function	    A function passed into another function