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
const friendsList = document.querySelector('.friendsList');
const friendsListButton = document.querySelector('.friendsListButton');
const closeFriendsList = document.querySelector('.closeFriendsList');

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function registerUser() {
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
    
    const reply = await makeRequest("https://localhost:8000/api/user/registerUser", {
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

async function loginUser() {
    const email = document.getElementById("professionalEmail").value;
    const password = document.getElementById("professionalPassword").value;
    const user = {
        email: email,
        password: password
    }
    console.log(user)
    const reply = await makeRequest("https://localhost:8000/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    //mudar isto
    if (reply.status === 201){
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("loginMessage").innerHTML = json.msg;
        createCookie('userToken', json.token, 0.5)  //VERIFICAR ESTA CENA
        createCookie('user', JSON.stringify(user), 0.5)
        logOn()
    }
    else{
        document.getElementById("loginMessage").style.display = "block";
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

friendsListButton.addEventListener('click', ()=> {
    friendsList.classList.add('active');
})

closeFriendsList.addEventListener('click', ()=> {
    friendsList.classList.remove('active');
})

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
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("loginMessage").innerHTML = json.msg;
        logOn()
    }
    else{
        document.getElementById("loginMessage").style.display = "block";
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
    document.getElementById("loginMessage").style.display = "none";
}

function logOff(){
    document.getElementById("loginPopUp").classList.add('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "inline";
    document.getElementById("logoutPopUpButton").style.display = "none";
    document.getElementById("portfolio").style.display = "none";
    window.location.href = "../index.html";
}

function switchLoginTab(tab) {
    // Remove active class from all tabs
    var loginTabs = document.getElementsByClassName('loginTab');
    for (var i = 0; i < loginTabs.length; i++) {
      loginTabs[i].classList.remove('active');
    }
  
    // Hide all login forms
    var loginForms = document.getElementsByClassName('loginForm');
    for (var i = 0; i < loginForms.length; i++) {
      loginForms[i].classList.remove('active');
    }
  
    // Show the selected login form and mark the corresponding tab as active
    document.getElementById(tab + 'LoginForm').classList.add('active');
  
    // Update tab text
    if (tab === 'professional') {
        document.getElementById('professionalTab').style.display = 'none';
        document.getElementById('enterpriseTab').style.display = 'block';
        document.getElementById('enterpriseLoginForm').style.display = 'none';
        document.getElementById('professionalLoginForm').style.display = 'block';
        document.getElementById('loginUser').style.display = 'block';
        document.getElementById('loginCompany').style.display = 'none';

    } else if (tab === 'enterprise') {
        document.getElementById('enterpriseTab').style.display = 'none';
        document.getElementById('professionalTab').style.display = 'block';
        document.getElementById('professionalLoginForm').style.display = 'none';
        document.getElementById('enterpriseLoginForm').style.display = 'block';
        document.getElementById('loginUser').style.display = 'none';
        document.getElementById('loginCompany').style.display = 'block';

    }
  }

function openLoginPopup() {
    loginPopUp.classList.add('activePopUp');
    document.getElementById("html").style.overflowY = "hidden";
}
  
window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('login')) {
      openLoginPopup();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var loginLink = document.querySelector('.loginLink');
    if (loginLink) {
      loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        openLoginPopup();
      });
    }
  });
  
async function registerCompany() {
    const companyName = document.getElementById("registerEnterpriseName").value;
    const email = document.getElementById("registerEnterpriseEmail").value;
    const password = document.getElementById("registerEnterprisePassword").value;
    const websiteURL =  document.getElementById("registerEnterpriseURL").value;
    const logoURL = document.getElementById("registerEnterpriseLogoURL").value;
    const description = document.getElementById("registerEnterpriseDescription").value;
    const company = {
        companyName: companyName,
        email: email,
        password: password,
        websiteURL: websiteURL,
        logoURL: logoURL,
        description: description,
    }
    
    const reply = await makeRequest("https://localhost:8000/api/company/registerCompany", {
        method: "POST",
        body: JSON.stringify(company),
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

async function loginCompany() {
    console.log('DEU CERTO')
    const email = document.getElementById("professionalEmail").value;
    const password = document.getElementById("professionalPassword").value;
    const user = {
        email: email,
        password: password
    }
    console.log(user)
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