async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function getUsers() {
    const reply = await makeRequest("https://localhost:8000/api/users", {
        method: "POST",
        body: JSON.stringify(),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    console.log(reply)

    document.getElementById("UsersAdmin123").innerHTML = "Juan"
}