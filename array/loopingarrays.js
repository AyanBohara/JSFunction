var arr = [10, 20, 30, 40, 50]
console.log(arr.length);

for (let a = 0; a < arr.length; a++) {
    console.log(arr[a]);

}

//make an array of first 5 even no
var a1 = []

for (let b = 0; b <= 10; b++) {
    if (b % 2 == 0) {
        console.log(b);
        a1.push(b)

    }
}
console.log(a1);

//make an array 10 - 0 reverse ma odd numver print
var ra = []
for (let i = 0; i <= 20; i++) {
    if (i % 2 == 0) {

    } else {
        ra.unshift(i);

    }
}
console.log(ra);

//Adding the array
var sum = 0
for (var a = 0; a < arr.length; a++) {
    console.log(arr[a]);
    sum = sum + arr[a]
    console.log(sum);

}