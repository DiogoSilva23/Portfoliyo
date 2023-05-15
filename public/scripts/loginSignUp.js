//In the future, make this in another way
/*
function closePopUp() {
    document.getElementById("loginPopUp").style.display = "none";
}

function loginPopUp() {
    document.getElementById("loginPopUp").style.display = "block";
}*/

const loginRegisterPopUp = document.querySelector('.loginRegisterPopUp');
const loginLink = document.querySelector('.loginLink');
const registerLink = document.querySelector('.registerLink');
const loginPopUpButton = document.querySelector('.loginPopUpButton')
const closeIcon = document.querySelector('.closeIcon');

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function signUp() {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const user = {
        username: username,
        email: email,
        password: password
    }

    const reply = await makeRequest("http://localhost:8000/signUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    json = await reply.json();
    switch (reply.status) {
        case 409:
            {
                document.getElementById("registerMessage").innerHTML = json.msg;
                break;
            }
        case 400:
            {
                document.getElementById("registerMessage").innerHTML = json.msg;
                break;
            }
        case 201:
            {
                document.getElementById("registerMessage").innerHTML = json.msg;
                break;
            }
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        email: email,
        password: password
    }

    const reply = await makeRequest("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    switch (reply.status) {
        case 404:
            {
                document.getElementById("loginMessage").innerHTML = json.msg;
                break;
            }
        case 401:
            {
                document.getElementById("loginMessage").innerHTML = json.msg;
                break;
            }
        case 201:
            {
                document.getElementById("loginMessage").innerHTML = json.msg;
                break;
            }
    }
}

registerLink.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.add('active');
});

loginLink.addEventListener("click", ()=> {
    loginRegisterPopUp.classList.remove('active');
});

loginPopUpButton.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.add('activePopUp');
    document.getElementById("html").style.overflowY = "hidden";
});

closeIcon.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.remove('activePopUp');
    document.getElementById("html").style.overflowY = "scroll";
});
