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
    const pword = document.getElementById("professionalPassword").value;
    const user = {
        email: email,
        pword: pword
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
        createCookie('user', JSON.stringify(json.user), 0.5)
        if(json.user.userAdmin === 1){
            logOnAdmin()
        }
        else{
            logOnUser()
        }
    }
    else{
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("loginMessage").innerHTML = json.msg;
    }
}
  
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (document.activeElement.id === 'professionalEmail' || document.activeElement.id === 'professionalPassword') {
            loginUser(); // Call the loginUser function when Enter key is pressed on the email or password input fields
        }
    }
});

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (document.activeElement.id === 'enterpriseEmail' || document.activeElement.id === 'enterprisePassword') {
        loginCompany(); // Call the loginUser function when Enter key is pressed on the email or password input fields
        }
    }
});

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
    const headerTextElement = document.querySelector('.headerText');
    headerTextElement.classList.add('moveOpen');
    headerTextElement.classList.remove('moveClose');
}
  
function moveHeaderTextClose() {
    const headerTextElement = document.querySelector('.headerText');
    headerTextElement.classList.add('moveClose');
    headerTextElement.classList.remove('moveOpen');
}

async function checkSession() { //MUDAR ESTA FUNÇAO -> PASSAR A USAR A FUNÇAO LOGIN
    const cookie = JSON.parse(readCookie('user'))
    const user = cookie
    console.log('COOKIE', cookie)
    console.log(typeof(cookie.nick))
    if (typeof(cookie.nick) === "string"){
        const reply = await makeRequest("https://localhost:8000/api/user/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        json = await reply.json();
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("loginMessage").innerHTML = json.msg;
        if (reply.status === 201){
            if(json.user.userAdmin === 1){
                logOnAdmin()
            }
            else{
                logOnUser()
            }
        }
    }else{
        const reply = await makeRequest("https://localhost:8000/api/company/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        json = await reply.json();
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("loginMessage").innerHTML = json.msg;
        if (reply.status === 201){
            logOnEnterprise()
        }
    }
}

async function logOut(){
    eraseCookie('user')
    eraseCookie('userToken')
    logOff()
}

function logOnUser(){
    document.getElementById("loginPopUp").classList.remove('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "none";
    document.getElementById("logoutPopUpButton").style.display = "inline-block";
    document.querySelector(".portfolio").style.display = "inline-block";
    document.getElementById("loginMessage").style.display = "none";
    document.getElementById("friendList").style.display = "flex";
    document.getElementById("jobOffers").style.display = "inline-block";
    document.getElementById("html").style.overflowY = "scroll";
    document.getElementById("openFriendListResponsive").style.display = "flex";
    moveHeaderTextClose()
}

function logOnEnterprise(){
    document.getElementById("loginPopUp").classList.remove('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "none";
    document.getElementById("logoutPopUpButton").style.display = "inline-block";
    document.querySelector(".portfolio").style.display = "none";
    document.getElementById("loginMessage").style.display = "none";
    document.getElementById("friendList").style.display = "none";
    document.getElementById("userSearch").style.display = "inline-block";
    document.getElementById("jobOffers").style.display = "none";
    document.getElementById("html").style.overflowY = "scroll";
    moveHeaderTextClose()
}

//NAO FUNCIONA BEM
function logOnAdmin(){
    window.location.href = "indexAdmin.html";
    document.getElementById("loginPopUp").classList.remove('activePopUp');
    moveHeaderTextClose()

}

function logOff(){
    window.location.href = "../index.html";
    document.getElementById("loginPopUp").classList.add('activePopUp');
    document.getElementById("loginPopUpButton").style.display = "inline-block";
    document.getElementById("logoutPopUpButton").style.display = "none";
    document.querySelector(".portfolio").style.display = "none";
    document.getElementById("friendList").style.display = "none";
    document.getElementById("userSearch").style.display = "none";
    document.getElementById("jobOffers").style.display = "none";
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
    const pword = document.getElementById("registerEnterprisePassword").value;
    const websiteURL =  document.getElementById("registerEnterpriseURL").value;
    const logoURL = document.getElementById("registerEnterpriseLogoURL").value;
    const description = document.getElementById("registerEnterpriseDescription").value;
    const company = {
        companyName: companyName,
        email: email,
        pword: pword,
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
        document.getElementById("registerMessageEnterprise").innerHTML = json.msg;
        //Mandar para a home page
        console.log('registado com sucesso')
    }
    else{
        console.log(json.msg)
        document.getElementById("registerMessageEnterprise").innerHTML = json.msg;
        console.log('problema no registo')
    }
}

async function loginCompany() {
    const email = document.getElementById("enterpriseEmail").value;
    const pword = document.getElementById("enterprisePassword").value;
    const company = {
        email: email,
        pword: pword,
    }
    console.log('jaun', company)
    const reply = await makeRequest("https://localhost:8000/api/company/login", {
        method: "POST",
        body: JSON.stringify(company),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    //mudar isto
    if (reply.status === 201){
        document.getElementById("loginMessage").innerHTML = json.msg;
        createCookie('userToken', json.token, 0.5)  //VERIFICAR ESTA CENA
        createCookie('user', JSON.stringify(json.company), 0.5)
        logOnEnterprise()
        document.getElementById("portfolio").style.display = "none";
    }
    else{
        document.getElementById("loginMessage").innerHTML = json.msg;
    }

}
  
