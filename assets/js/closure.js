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