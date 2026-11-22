var arr = [10, 20, 30, 40]
arr.splice(1, 2) //starting index, count of element
console.log(arr);

//adding without replacing in first index 20
arr.splice(1, 0, 70, 60)
console.log(arr);

//to remove first 2 indexes and add single number 
arr.splice(0, 2, 80) //10,70 is removed and 80 is added
console.log(arr);

//starting index, count, adding elements
var arrs = ['Ayan', 'Zyan', 'Peters', 'Luis']
arrs.splice(1, 0, 'Anshu', 'Rita')
console.log(arrs);

arrs.splice(1, 2, 'Tina', 'Bina');
console.log(arrs);

//Reverse-to reverse the index showing from eding to start
arrs.reverse()
console.log(arrs);

var rass = [88, 44, 99, 11, 2, 55, 100]
rass.reverse()
console.log(rass);
rass.sort() //used to sort from ascending order
console.log(rass); //op: 11,2,44 ... it sorts looking first digit only

//so to solve this proble,
rass.sort((a, b) => a - b)
console.log(rass);
rass.sort((a, b) => b - a) //reverse a sort
console.log(rass);

//question
var arra = [55, 22, 5, 11, 4, 77, 33, 999]
arra.push(1) //999,1
console.log(arra);
arra.shift() //55 remove hunxa
console.log(arra);

arra.unshift(20) //55 ko thauma 20 auxa
console.log(arra);

arra.sort() // 1,4,5,11,20,22
console.log(arra);

arra.reverse() //999,77,5,4,33,22,20,11,1
arra.pop()
console.log(arra);
