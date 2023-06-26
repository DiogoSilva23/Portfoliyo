

async function getUsers() {
    const reply = await makeRequest("https://localhost:8000/api/users", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    json = await reply.json();
    return json;
}

async function insertUsers(){
    document.getElementById("userContainer").innerHTML = ""
    users = await getUsers()
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.getElementById("userContainer").innerHTML += `
            <div class="user">
            <p><b>Username: </b>${user.nick}</p>
            <p><b>Nome: </b>${user.userName}</p>
            <p><b>Email: </b>${user.email}</p>
            <button class="viewProfileButton"><ion-icon name="person-circle" size="large"></ion-icon></button>
        </div>
        `;
    }
}

async function getEnterprises() {
    const reply = await makeRequest("https://localhost:8000/api/enterprises", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    json = await reply.json();
    return json;
}

async function insertEnterprises(){
    
    document.getElementById("enterpriseContainer").innerHTML = ""
    enterprises = await getEnterprises()
    for (let i = 0; i < enterprises.length; i++) {
        const enterprise = enterprises[i];
        document.getElementById("enterpriseContainer").innerHTML += `
        <div class="user" >
        <p><b>Nome: </b>${enterprise.companieName}</p>
        <p><b>Email: </b>${enterprise.email}</p>
        <p><b>Website URL: </b>${enterprise.siteUrl}</p>
    </div>
        `;
    }
}
