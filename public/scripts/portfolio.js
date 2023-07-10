

var editSidebar = false;
var editAboutme = false;
var editExperience = false;
var editEducation = false;

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

async function getPortfolio(user){
    const reply = await makeRequest("https://localhost:8000/api/user/getPortfolio", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    portfolio = await reply.json();
    const userPortfolio = portfolio.portfolio;
    return userPortfolio;


}
// get experiences from user
async function getExperiences(user){
    const reply = await makeRequest("https://localhost:8000/api/user/getExperiences", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    json = await reply.json();
    const userExperiences = json;
    console.log('EXPE', userExperiences);
    return userExperiences;
}
// get educations from user
async function getEducations(user){
    const reply = await makeRequest("https://localhost:8000/api/user/getEducations", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    jseon = await reply.json();
    const userEducations = jseon
    return userEducations;

}


async function enterPortfolio(){
    editSidebar = false;
    editAboutme = false;
    editExperience = false;
    editEducation = false;
    templatePortfolio()
    // get the user id from the url 
    const urlParams = new URLSearchParams(window.location.search);
    fillPortfolio(urlParams.get('user'))
}
// test enterportfolio from different user by redirecting to the url with the id of the user

async function getUserforprofile(userId){
    const reply = await makeRequest("https://localhost:8000/api/user/getUser/"+userId, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    jseon = await reply.json();
    console.log(jseon)
    const user = jseon
        return user;
}

async function fillPortfolio(userId){
    // get the user id from the cookie
    // make a if userid empty , then is equal to the cookie id

    const cookie = JSON.parse(readCookie("user"));
    
    if (userId == null){
        userId = cookie.id
    }

    // get user from database
    const user = await getUserforprofile(userId);
    const portfolio = await getPortfolio(user[0]); 

    console.log('PORTF', portfolio)


    const userInfoSidebar = {
        name: portfolio.userName,
        title: "@" + portfolio.nick,
        email: portfolio.email,
        phoneNumber: portfolio.phone,
        birthDate: portfolio.birthDate,
        location: portfolio.location
    }
    fillSidebar(userInfoSidebar)

    const userInfoAboutme = {
        description: portfolio.userDescription
    }
    fillAboutme(userInfoAboutme, false)

    const userInfoExperiences = await getExperiences(user);
    console.log(userInfoExperiences)
    fillExperience(userInfoExperiences);
    const userInfoEducations = await getEducations(user);
    console.log(userInfoEducations)
    fillEducation(userInfoEducations);


     if (cookie.id == userId) {
       let editbtns = document.getElementsByClassName("editBTN");
       for (let i = 0; i < editbtns.length; i++) {
         editbtns[i].style.display = "inline";
       }
     } else {
       let editbtns = document.getElementsByClassName("editBTN");
       for (let i = 0; i < editbtns.length; i++) {
         editbtns[i].style.display = "none";
       }
     }
}

function toggleEditMode(where)  {
    //toggle a variable between edit true or false
    switch(where){
        case "sidebar":
            if(!editSidebar){
                editSidebar = !editSidebar;
                editSidebarF()
            }
            break;
        case "aboutme":
            if(!editAboutme){
                editAboutme = !editAboutme;
                editAboutmeF()
            }
            break;
        case "exp":
            if(!editExperience){
                editExperience = !editExperience;
                editExperienceF()
            }
            break;
        case "edu":
            if(!editEducation){
                editEducation = !editEducation;
                editEducationF()
            }
            break;

    }
    
}

function fillSidebar(userInfoSidebar){
    document.getElementById("userSidebarName").innerHTML= userInfoSidebar.name;
    document.getElementById("userSidebarTitle").innerHTML= userInfoSidebar.title;
    document.getElementById("userSidebarEmail").innerHTML= userInfoSidebar.email;
    document.getElementById("userSidebarEmail").href= "mailto:" + userInfoSidebar.email;
    document.getElementById("userSidebarPhone").innerHTML= userInfoSidebar.phoneNumber;
    document.getElementById("userSidebarBirthday").innerHTML= userInfoSidebar.birthDate;
    document.getElementById("userSidebarLocation").innerHTML= userInfoSidebar.location;
}

function fillAboutme(userInfoAboutme){
    document.getElementById("userAboutText").innerHTML= userInfoAboutme.description;

}
async function fillExperience(userInfoExperiences){
    console.log(userInfoExperiences)
    document.getElementById("ExperienceList").innerHTML ="";
    for (let i = 0; i < userInfoExperiences.length; i++) {
        const experience = userInfoExperiences[i];
        document.getElementById("ExperienceList").innerHTML += `
            <li class="service-item-exp" id="${experience.idExperiences}">

                <div class="service-icon-box">
                    <img src="${experience.logoUrl}
                    " alt="../image/te.png" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">${experience.inicialDate} - ${experience.finalDate} <br> ${experience.localName}</h4>

                    <p class="service-item-text">
                    ${experience.functionsDescription}

                    </p>
                </div>
                <button class="editBTN" style="display:block;" onclick='deleteExperience(${experience.idExperiences})'>--</button>
            </li>

        `;
    }
}

//function to delete an experience find element by classes service-item and erase the one with the index i 
async function deleteExperience(id){
    var elements = document.getElementsByClassName("service-item-exp"); //meter experience
    //delete element by finding the one with the same id
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].id == id){
            elements[i].remove();
        }
    }
    //delete from database
    const user = JSON.parse(readCookie('user'))
    const reply = makeRequest("https://localhost:8000/api/user/deleteExperience", {
        method: "POST",
        body: JSON.stringify({id: id, userId: user.id}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    if (reply.status === 201){
        console.log("deleted experience")
    }
}
/*
function addExperience(Experience){

}
*/
// delete education
async function deleteEducation(id){
    var elements = document.getElementsByClassName("service-item-edu"); //meter experience
    //delete element by finding the one with the same id
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].id == id){
            elements[i].remove();
        }
    }
    //delete from database
    const user = JSON.parse(readCookie('user'))
    const reply = makeRequest("https://localhost:8000/api/user/deleteEducation", {
        method: "POST",
        body: JSON.stringify({id: id, userId: user.id}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    enterPortfolio();
}

async function fillEducation(userInfoEducation){
    document.getElementById("EducationsList").innerHTML ="";
    for (let i = 0; i < userInfoEducation.length; i++) {
        const education = userInfoEducation[i];
        document.getElementById("EducationsList").innerHTML += `
            <li class="service-item-exp" id="${education.idEducation}">


                <div class="service-content-box">
                    <h4 class="h4 service-item-title"> ${education.schoolName}<br> ${education.curseName} - ${education.curseType}</h4>

                    <p class="service-item-text">
                     Media do curso: ${education.media}

                    </p>
                </div>
                <button class="editBTN" style="display:block;" onclick='deleteEducation(${education.idEducation})'>--</button>
            </li>

        `;
    }
}


// Function to check if any paragraph is in edit mode
function isEditModeActive() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('edit') && urlParams.get('edit') === 'true';
}
/*
function toggleEditMode() {
    var inputField = document.querySelector('.editable-input');
    var editButton = document.querySelector('.edit-button');
  
    if (inputField.disabled) {
        inputField.disabled = false;
        editButton.textContent = 'Save';
    } else {
        inputField.disabled = true;
        editButton.textContent = 'Edit';
        saveText();
    }
}
  */
window.addEventListener('DOMContentLoaded', function() {
    loadText();
  
    // Disable the input field initially
    var inputField = document.querySelector('.editable-input');
    inputField.disabled = true;
  
    if (isEditModeActive()) {
      toggleEditMode();
    }

    loadText()
})
