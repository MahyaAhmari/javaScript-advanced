let users = [];

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        users = await response.json();
        console.table(users);
    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);
    }
}

document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, email } = Object.fromEntries(new FormData(e.target));

    const user = users.find(
        (item) =>
            item.name.toLowerCase() === name.trim().toLowerCase() &&
            item.email.toLowerCase() === email.trim().toLowerCase()
    );

    const message = document.querySelector(".login-message");

    message.textContent = user
        ? "ورود با موفقیت انجام شد"
        : "نام یا ایمیل صحیح نیست";

    message.className = `login-message block text-center font-bold rounded-lg py-2 ${
        user ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
    }`;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
});

getUsers();

