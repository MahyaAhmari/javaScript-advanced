document.querySelector(".signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const { name, email, password } = Object.fromEntries(
        new FormData(e.target)
    );

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Signup error:", error);
    }
});

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