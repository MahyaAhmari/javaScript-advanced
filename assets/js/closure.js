function increaseCounter() {
    let counter = 0;
    // counter ++;
    // return counter;

    return function () {
        counter ++;
        return counter;
    };
};

const myCounter = increaseCounter();

console.log(myCounter());
console.log(myCounter());
console.log(myCounter());



///////////////////////some practices///////////////////////////////
function greeting(name) {
    return function() {
        return `Hello ${name}!`;
    };
};

const sayHello = greeting("mahya");

console.log(sayHello());






function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
};

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));
console.log(triple(5));





const counter = (function() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
})();

console.log(counter());
console.log(counter());
console.log(counter());