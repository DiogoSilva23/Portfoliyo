

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

async function getPortfolio(){
    const user = JSON.parse(readCookie('user'))
    const reply = await makeRequest("https://localhost:8000/api/user/getPortfolio", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    if (reply.status === 201){
        const userPortfolio = json.portfolio
        return userPortfolio;
    }
}


// get experiences from user
async function getExperiences(){
    const user = JSON.parse(readCookie('user'))
    const reply = await makeRequest("https://localhost:8000/api/user/getExperiences", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    json = await reply.json();
    const userExperiences = json;
    console.log(userExperiences);
    return userExperiences;
}
// get educations from user
async function getEducations(){
    const user = JSON.parse(readCookie('user'))
    const reply = await makeRequest("https://localhost:8000/api/user/getEducations", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await reply.json();
    if (reply.status === 201){
        const userEducations = json
        return userEducations;
    }
}




async function enterPortfolio(){
    editSidebar = false;
    editAboutme = false;
    editExperience = false;
    editEducation = false;
    templatePortfolio()
    // get the user id from the url 
    const urlParams = new URLSearchParams(window.location.search);
    fillPortfolio(urlParams.get('id'));
}

async function fillPortfolio(userId){
    // get the user id from the cookie
       const cookie = JSON.parse(readCookie("user"));
       console.log(cookie.id)
       console.log(userId)
       userId = "1e9ff9b647a6408f5f7d"
       // make the code to if user id is equal to the logged in user, then show edit buttons in the classes editBTN
   


 
    const portfolio = await getPortfolio(); 
    /*
    const portfolio = {
        username = "",
        nick = "",
        email = "",
        phone = "",
        birthdate = "",
        location = "",
        description = "",
    }
    
    
    */
    console.log(portfolio)
    const userInfoSidebar = {
        name: portfolio.userName,
        title: "@" + portfolio.nick,
        email: portfolio.email,
        phoneNumber: "+351 96777",
        birthDate: portfolio.birthDate,
        location: portfolio.location
    }

    fillSidebar(userInfoSidebar)
    const userInfoAboutme = {
        description: portfolio.userDescription
    }
    fillAboutme(userInfoAboutme, false)

    const userInfoExperiences = await getExperiences();
    console.log(userInfoExperiences)
    fillExperience(userInfoExperiences);
    /*const userInfoEducations = await getEducations();
    fillEducation(userInfoEducations);*/


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
}

function addExperience(Experience){
  // count how many experiences there are and store in position
  // create dummy experience with 1 experience that starts in 2021 and ends current , its title is engineer and its description is "I am an engineer"
  Experience = {
    initialDate: "2021",
    id: "14221412",
    finalDate: "curffffffrent",
    title: "afsafasafasfsaengineer",
    description: "I am an engineer",
    image: "https://autonoma.pt/wp-content/uploads/2018/01/logoUAL1.png",
  };
  const experience = Experience;
  document.getElementById("ExperienceList").innerHTML += `
    <li class="service-item-exp" id="${experience.id}">

                <div class="service-icon-box">
                    <img src="${experience.image}
                    " alt="/images/te.png" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">  <br> </h4>
                    <div class="birthdate">
                        <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                        <label for="registerBirthdate">Birthdate</label>
                        <input type="date" name="registerDate" id="registerDate" required>
                    </div>
                    <p class="service-item-text">
                    

                    </p>
                </div>
                <button class="editBTN" style="display:block;" onclick='deleteExperience(${experience.id})'>-</button>

            </li>
        
        `;

}
/*
function fillEducation(userInfoEducations){
    //create dummy user info with 1 education that starts in 2021 and ends current , its title is LEI and its description is "I am studying LEI"
    userInfoEducations = [{initialDate: "2021", finalDate: "current", title: "LEI", description: "I am studying LEI", image:"https://autonoma.pt/wp-content/uploads/2018/01/logoUAL1.png"}]  

    for (let i = 0; i < userInfoEducations.length; i++) {
        const education = userInfoEducations[i];
        document.getElementById("education4").innerHTML += `
            <li class="service-item1">

    <div class="service-icon-box">
    <img src="${education.image}
    " alt="/images/te.png" width="40">
    </div>

    <div class="service-content-box">
    <h4 class="h4 service-item-title">${education.initialDate} - ${education.finalDate} <br> ${education.title}.</h4>

    <p class="service-item-text">
    
    ${education.description}

    </p>
    </div>

            `;
    }    
}*/

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
