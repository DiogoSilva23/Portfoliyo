//In the future, make this in another way
/*
function closePopUp() {
    document.getElementById("loginPopUp").style.display = "none";
}

function loginPopUp() {
    document.getElementById("loginPopUp").style.display = "block";
}*/

const loginPopUp = document.querySelector('.loginPopUp');
const loginPopUpButton = document.querySelector('.loginPopUpButton');
const closeIcon = document.querySelector('.closeIcon');
const loginSubmit = document.querySelector('.loginSubmit');

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function register() {
    const username = document.getElementById("registerUsername").value;
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const location =  document.getElementById("registerLocation").value;
    const description = document.getElementById("registerDescription").value;
    const gender = document.getElementById("gender").value;
    const birtdate = document.getElementById("registerDate").value;
    const visibleProfile = document.getElementById("visibleProfile").checked;
    const user = {
        username: username,
        name: name,
        email: email,
        password: password,
        location: location,
        description: description,
        gender: gender,
        birtdate: birtdate,
        visibleProfile: visibleProfile
    }
    console.log(user, 'user')
    
    const reply = await makeRequest("https://localhost:8000/api/user/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    json = await reply.json();
    if (reply.status === 201){
        document.getElementById("registerMessage").innerHTML = json.msg;
        //Mandar para a home page
        console.log('registado com sucesso')
    }
    else{
        document.getElementById("registerMessage").innerHTML = json.msg;
        console.log('problema no registo')
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        email: email,
        password: password
    }

    const reply = await makeRequest("https://localhost:8000/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    //mudar isto
    if (reply.status === 201){
        document.getElementById("loginMessage").innerHTML = json.msg;
        createCookie('userToken', json.token, 0.5)  //VERIFICAR ESTA CENA
        createCookie('user', JSON.stringify(user), 0.5)
        logOn()
    }
    else{
        document.getElementById("loginMessage").innerHTML = json.msg;
    }

}

// EVENT LISTENERS DO LOGIN E DO SIGN UP

loginPopUpButton.addEventListener('click', ()=> {
    loginPopUp.classList.add('activePopUp');
    document.getElementById("html").style.overflowY = "hidden";
});

closeIcon.addEventListener('click', ()=> {
    loginPopUp.classList.remove('activePopUp');
    document.getElementById("html").style.overflowY = "scroll";
});

// MOVER TEXTO QUANDO O FORM ABRE/FECHA

function moveHeaderTextOpen() {
    const headerTextElement = document.querySelector('.header-text');
    headerTextElement.classList.add('moveOpen');
    headerTextElement.classList.remove('moveClose');
}
  
function moveHeaderTextClose() {
    const headerTextElement = document.querySelector('.header-text');
    headerTextElement.classList.add('moveClose');
    headerTextElement.classList.remove('moveOpen');
}

async function checkSession() { //MUDAR ESTA FUNÇAO -> PASSAR A USAR A FUNÇAO LOGIN
    const cookie = JSON.parse(readCookie('user'))
    const email = cookie.email
    const password = cookie.password
    const user = {
        email: email,
        password: password
    }

    const reply = await makeRequest("https://localhost:8000/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    if (reply.status === 201){
        document.getElementById("loginMessage").innerHTML = json.msg;
        logOn()
    }
    else{
        document.getElementById("loginMessage").innerHTML = json.msg;
    }
}

async function logOut(){
    eraseCookie('user')
    eraseCookie('userToken')
    logOff()
}

function logOn(){
    document.getElementById("loginPopUp").classList.remove('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "none";
    document.getElementById("logoutPopUpButton").style.display = "inline";
    document.getElementById("portfolio").style.display = "inline";
}

function logOff(){
    document.getElementById("loginPopUp").classList.add('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "inline";
    document.getElementById("logoutPopUpButton").style.display = "none";
    document.getElementById("portfolio").style.display = "none";
}

