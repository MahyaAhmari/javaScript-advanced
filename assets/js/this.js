function showThis() {
    console.log(this);
}

showThis();   // this = window


const obj = {name: "mahya", f: showThis};

obj.f();   // this = obj






const sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
};

const user1 = { name:"mahya", sayHello:sayHello };
const user2 = { name:"anyone", sayHello:sayHello };

user1.sayHello();   //Hello, I'm mahya
user2.sayHello();   //Hello, I'm anyone








const showThis2 = () => {
    console.log(this);
}

showThis2();   // this = window


const obj2 = {name: "mahya", f: showThis2};

obj2.f();   // this = window


function showThis3() {
    const showThis4 = () => {
        console.log(this.name);
    }
    showThis4();
}

const obj3 = {name: "mahya", f: showThis3};

obj3.f();   // this = obj