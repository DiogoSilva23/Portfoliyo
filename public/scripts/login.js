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

registerLink.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.add('active');
});

loginLink.addEventListener("click", ()=> {
    loginRegisterPopUp.classList.remove('active');
});

loginPopUpButton.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.add('activePopUp');
});

closeIcon.addEventListener('click', ()=> {
    loginRegisterPopUp.classList.remove('activePopUp');
});
