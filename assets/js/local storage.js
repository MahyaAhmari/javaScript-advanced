// localStorage.setItem("name", "mahya");
// localStorage.setItem("lastname", "ahmari");

// localStorage.removeItem("lastname");


// let userName = localStorage.getItem("name");

// console.log(userName);

// localStorage.clear();




// const user = {name: "mahya", age: 15};

// localStorage.setItem("user", JSON.stringify(user));

// const savedUser = JSON.parse(localStorage.getItem("user"));
// console.log(savedUser.name);








                                        //main practice

const blueBtn = document.getElementById("blueBtn");
const redBtn = document.getElementById("redBtn");
const bgColor = localStorage.getItem("bgColor");

if (bgColor) {
    document.body.style.backgroundColor = bgColor;
}

blueBtn.addEventListener("click", () => {
    localStorage.setItem("bgColor", "blue");
    document.body.style.backgroundColor = "blue";
});

redBtn.addEventListener("click", () => {
    localStorage.setItem("bgColor", "red");
    document.body.style.backgroundColor = "red";
});


const saveNameBtn = document.getElementById("saveNameBtn");
const userName = localStorage.getItem("userName");

if (userName) {
    document.getElementById("title").textContent = `سلام ${userName}!`;
};

saveNameBtn.addEventListener("click", () => {
    const userName = document.getElementById("nameInput").value;
    localStorage.setItem("userName", userName);
    document.getElementById("title").textContent = `سلام ${userName}!`;
});