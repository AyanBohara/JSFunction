// Non-mutating doesnt change original array 
var arr = [10, 20, 30, 40]
//slice - sano euuta cake ko slice leko jasto
//esle orginal array lai edit gardaina
var a2 = arr.slice(0, 3)
console.log(a2);

//concat is used to join the array

var a1 = [1, 2, 3, 4]
var a2 = [5, 6, 7, 8]
var a3 = a1.concat(a2)
console.log(a3);

//includes - esle element xa ki xaina array ma bhanera

var a = [10, 20, 30, 50]
var ans = a.includes(20)
console.log(ans);
var ans = a.includes(40)
console.log(ans);

var arr4 = [10, 20, 30, 40]
var ans4 = arr.includes(10) //include le yo exist garxa ki nai matra bhanxa
//ka include xa kun index ma xa bhanera herna
var b = arr4.indexOf(20)
console.log(b);

console.log(ans4);


