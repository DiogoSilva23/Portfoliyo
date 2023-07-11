

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
            <button class="viewProfileButton" onclick="window.location.href = '/portfolio.html?user=${user.id}'"><ion-icon name="person-circle" size="large"></ion-icon></button>
        </div>
        `;
    }
}

async function getEnterprises() {
    const reply = await makeRequest("https://localhost:8000/api/enterprises/Confirmed", {
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

async function getEnterprisesConfirmations(){
    console.log('OOOOO')
    const reply = await makeRequest("https://localhost:8000/api/enterprises/NotConfirmed", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    json = await reply.json();
    console.log('ooo')
    return json;
}

async function insertEnterprisesConfirmations(){
    document.getElementById("enterpriseConfirmation").innerHTML = ""
    enterprises = await getEnterprisesConfirmations()
    for (let i = 0; i < enterprises.length; i++) {
        const enterprise = enterprises[i];
        document.getElementById("enterpriseConfirmation").innerHTML += `
        <div class="enterpriseConfirm">
        <p><b>Nome: </b>${enterprise.companieName}</p>
        <p><b>Email: </b>${enterprise.email}</p>
        <p><b>Website URL: </b>${enterprise.siteUrl}</p>
        <p><b>Descrição: </b>${enterprise.companieDescription}</p><br>
        <p>Accept Confirmation?</p>
        <button onclick="acceptEnterprise('${enterprise.id}')" type="submit" class="confirmButton">Yes</button>
        <button onclick="rejectEnterprise('${enterprise.id}')" type="submit" class="confirmButton">No</button>
    </div>
        `;
    }
}

async function acceptEnterprise(id){
    const request = {
        id: id,
    }
    const reply = await makeRequest("https://localhost:8000/api/enterprises/accept", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    insertEnterprisesConfirmations() 
}

async function rejectEnterprise(id){
    const request = {
        id: id,
    }
    const reply = await makeRequest("https://localhost:8000/api/enterprises/reject", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    insertEnterprisesConfirmations() 
}
