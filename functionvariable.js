//Function Expression

var hero = function hero(){
    console.log('You are a main character')
}
hero();

//what is anonymous function
// Functrion wich doesnt have name

//Function decleration
function a1(){
    console.log('Hello function');
    
}

//function expression
const a2 = function(){
    console.log('hello function2');
}

//Arrow function is same as a function
//a3 is arrow function flat arrow funcion
const a3 = ()=>{
    console.log('hello anpnymous');
}

//one liner function
const a4 = ()=>console.log('eh ok one line function');
    a4();

    //this is immediate invoke expression function
    (function(){
        console.log('hello immediate function');
    })()

