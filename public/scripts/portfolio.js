

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
async function enterPortfolio(){
    editSidebar = false;
    editAboutme = false;
    editExperience = false;
    editEducation = false;
    templatePortfolio()
    // get the user id from the url 
    const urlParams = new URLSearchParams(window.location.search);
    //fillPortfolio(urlParams.get('id'))
    fillPortfolio("0833bc82b31c3f6e8013");
}

async function fillPortfolio(userId){
    // get the user id from the cookie
       const cookie = JSON.parse(readCookie("user"));
       console.log(cookie.id)
       console.log(userId)
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

    const userInfoExperiences = "afsfaf"
    fillExperience(userInfoExperiences);
    const userInfoEducations = "afsfaf";
    fillEducation(userInfoEducations);


     if (cookie.id == userId) {
       let editbtns = document.getElementsByClassName("editBTN");
       for (let i = 0; i < editbtns.length; i++) {
         editbtns[i].style.display = "block";
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
function fillExperience(userInfoExperiences){
    //make dummy user info with 1 experience that starts in 2021 and ends current , its title is engineer and its description is "I am an engineer"
    userInfoExperiences = [{initialDate: "2021", id: "12312312", finalDate: "current", title: "engineer", description: "I am not an engineer", image:"https://autonoma.pt/wp-content/uploads/2018/01/logoUAL1.png"}]
    // add another one , title webDeveloper and description "I am a web developer" no start or end
    
    userInfoExperiences.push({initialDate: "", id: "12314312", finalDate: "", title: "webDevefasafasfsafsfasloper", description: "I am a fasfasfasffsafasfasffasweb developer"})
    for (let i = 0; i < userInfoExperiences.length; i++) {
        const experience = userInfoExperiences[i];
        document.getElementById("ExperienceList").innerHTML += `
            <li class="service-item-exp" id="${experience.id}">

                <div class="service-icon-box">
                    <img src="${experience.image}
                    " alt="/images/te.png" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">${experience.initialDate} - ${experience.finalDate} <br> ${experience.title}</h4>

                    <p class="service-item-text">
                    ${experience.description}

                    </p>
                </div>
                <button class="editBTN" style="display:block;" onclick='deleteExperience(${experience.id})'>--</button>
            </li>

        `;
    }
}

//function to delete an experience find element by classes service-item and erase the one with the index i 
function deleteExperience(id){
    var elements = document.getElementsByClassName("service-item-exp"); //meter experience
    //delete element by finding the one with the same id
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].id == id){
            elements[i].remove();
        }
    }
}
function addExperience(Experience){
    // count how many experiences there are and store in position
    // create dummy experience with 1 experience that starts in 2021 and ends current , its title is engineer and its description is "I am an engineer" 
    Experience = {initialDate: "2021", id: "14221412", finalDate: "curffffffrent", title: "afsafasafasfsaengineer", description: "I am an engineer", image:"https://autonoma.pt/wp-content/uploads/2018/01/logoUAL1.png"}
    const experience = Experience;
        document.getElementById("ExperienceList").innerHTML += `
            <li class="service-item-exp" id="${experience.id}">

                <div class="service-icon-box">
                    <img src="${experience.image}
                    " alt="/images/te.png" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">${experience.initialDate} - ${experience.finalDate} <br> ${experience.title}</h4>

                    <p class="service-item-text">
                    ${experience.description}

                    </p>
                </div>
                <button class="editBTN" style="display:block;" onclick='deleteExperience(${experience.id})'>-----</button>
            </li>

        `;
    //get the values from the input fields
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
