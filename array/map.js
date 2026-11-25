// map() creates a new array by changing each element.
var numbers = [1, 2, 3, 4, 5]
var doubled = numbers.map(function (number) {
    return number * 2
})
console.log("Doubled:", doubled)

// filter() creates a new array with elements that pass the condition.
var evenNumbers = numbers.filter(function (number) {
    return number % 2 === 0
})
console.log("Even numbers:", evenNumbers)

// reduce() combines the elements into one value.
var total = numbers.reduce(function (sum, number) {
    return sum + number
}, 0)
console.log("Total:", total)

// Methods can be chained: double each number, keep values over 5, then add them.
var result = numbers
    .map(function (number) {
        return number * 2
    })
    .filter(function (number) {
        return number > 5
    })
    .reduce(function (sum, number) {
        return sum + number
    }, 0)
console.log("Chained result:", result)