
function greet(user) {
    console.log('Good Morning', user);

}
greet('Ayan')

//if user doesnt pass anything then it will
// print undefined which is not good program

//Default parameters
function greet(user = 'Sir', age = 18) {
    console.log('Good Morning', user, age);

}
greet('Anshu')
greet();

//Rest Parameter
// A rest parameter allows a function to accept multiple arguments and collect them into a single array.
// The three dots ... collect all remaining arguments into an array.
function goodmorning(...all) {
    console.log("Good morning", all);

}
goodmorning('Ayan', 'Narayan', 'Ram', 'Darcy')

//Return Values
function hero() {

    return 20 //this is last line
}

var a = hero()
console.log(a);

