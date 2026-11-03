function sq(a){
    console.log(a*a);

} 
sq(2)

function add(a,b,c,d,e){
    console.log('Adding',a+b,c,d,e)
}

add(10,20,3,4,5)


function greet(user){
    console.log('Good Morning', user)

}
greet('Ayan')

function checkEligibility(user, age){

    if(age>18){
        console.log(user,'You can vote')
    }
else{
    console.log(user,'Soory you cant vote');
}
}

checkEligibility('Ayan',21)
