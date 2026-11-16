//1. Function Fundamentals
function greetUSer(user) {
    console.log("Hello,", user);

}

greetUSer("Ayan")

//2. Add 2 num

const add = (a, b) => {
    return a + b;

}
console.log("Additional of two num", add(2, 4));

//3. Check Even or ODD
function checkEvenOdd(num) {
    if (num % 2 == 0) {
        console.log("Even number");
    } else {
        console.log("Odd number");
    }
}
checkEvenOdd(7);
checkEvenOdd(12);

//4.Find the largest of 2 num
function findLargest(a, b) {
    if (a > b) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return "Both numbers are equal";

    }
}
console.log(findLargest(4, 2))

//5.Calculate area of Rectangle
function calculateArea(length, width) {
    return length * width;
}

console.log("Area of Rect", calculateArea(2, 4));

//Level 2- Parameters and return value

//6. Create a default parameters
function greet(name = "Guest") {
    console.log("Good Morning:", name);

}
greet();
greet("Ayan");

//7. Calculate total Price
const totalPrice = (price, quantity = 1) => {
    return price * quantity;

}
console.log(totalPrice(500, 3));
console.log(totalPrice(500));

//8. find the square of a number
const square = (x) => x * x;
console.log(square(2));

//9.Create a Calculator

function calculate(a, b, operator) {
    if (operator == "+") {
        return a + b;
    } else if (operator == "-") {
        return a - b;
    } else if (operator === "*") {
        return a * b;
    } else if (operator === "/") {
        return a / b;
    }

    else {
        return "Invalid operator"
    }
}
console.log(calculate(2, 3, "+"));
console.log(calculate(10, 5, "*"));

//10. Check Voting Eligibility
function canVote(age) {
    if (age < 0) {
        return "Invalid age";
    }
    if (age >= 18) {
        return "Eligible to vote";
    }

    return "Not eligible to vote"

}
console.log(canVote(18));


//🟡 Level 3 — Rest Parameters

//11. Sum any number of values
function sumAll(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total = total + num;
    }
    return total;
}

console.log(sumAll(1, 2, 3));

//12. Find the Largest number

function findLargest(...numbers) {
    for (let lnum of numbers) {
        if (lnum > numbers) {
            return lnum;
        }
    }
}

console.log(findLargest(4, 9, 2, 15, 6));

//13. calculate average
function average(...numbers) {
    let total = 0;
    for (const num of numbers) {
        total = total + num;

    }
}

//Level 4 — Function Expressions & Arrow Functions
const multi = function multiply(a, b) {
    return a * b;
}
console.log(multiply(2, 4))