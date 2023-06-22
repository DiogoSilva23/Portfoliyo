const { portfolioGet } = require("../../controllers/usersController");

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

async function fillPortfolio(){
    console.log('AHGFHSJAFYGFUYGYUTZX')
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
    console.log(userInfoAboutme)
    //fillAboutme(userInfoAboutme, false)
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

function fillAboutme(userInfoAboutme, edit){
    var textAboutme = `<textarea class="editable-input" placeholder="Enter your text here" disabled="">Descricao</textarea>`
                       
    if(!edit){
        textAboutme = userInfoAboutme.description
    }
    var aboutme = `<!--#main-content-->
        <div class="main-content">

        <!--#ABOUT-->
        <article class="about  active" data-page="about">

            <header>
            <h2 class="h2 article-title">About me</h2>
            </header>

            <section class="about-section">
            <!--#Meter aqui a descricao-->
            
                <div class="about-text">
                `+textAboutme+`
                <button class="edit-button" onclick="toggleEditMode()">Edit</button>
                </div>
            </section>
            <hr>
            <section>
            <div class="tabtitles">
                <p class="tablinks activelink" onclick="opentab('skills4', this)">Skills</p>
                <p class="tablinks" onclick="opentab('experience4', this)">Experience</p>
                <p class="tablinks" onclick="opentab('education4', this)">Education</p>
            </div>
            <div class="tabcontents activetab" id="skills4">
                <ul>
                    <li><span>UI/UX</span><br>Designing Web/App interfaces</li>
                    <li><span>Web Development</span><br>Web/App Development</li>
                    <li><span>App Development</span><br>Building Android/iOS apps</li>
                </ul>
            </div>
            <div class="tabcontents" id="experience4">
                <ul>
                    <li><span>2021 - Current</span><br>UI/UX Design Training at ET Insitute.</li>
                    <li><span>2019 - 2021</span><br>Team lead at StarApp LLC.</li>
                    <li><span>2017 - 2019</span><br>UI/UX Design Executive at Coin Digital Ltd.</li>
                    <li><span>2016 - 2017</span><br>Internship at ekart eCommerce.</li>
                    </ul>
                </div>
                <div class="tabcontents" id="education4">
                    <ul>
                        <li><span>2016</span><br>UI/UX Design Training at ET Institute.</li>
                        <li><span>2016</span><br>MBA from MIT Bangalore.</li>
                        <li><span>2014</span><br>BBA from ISM Bangalore.</li>
                    </ul>
                </div>
            </section>

            <!-- service-->
            <section class="service">

            <h2 class="h2 service-title">Portfolio</h2>

            <ul class="service-list">

                <li class="service-item">

                <div class="service-icon-box">
                    <img src="/images/te.png
                    " alt="design icon" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">Web design</h4>

                    <p class="service-item-text">
                    The most modern and high-quality design made at a professional level.
                    </p>
                </div>

                </li>

                <li class="service-item">

                <div class="service-icon-box">
                    <img src="/images/te.png" alt="Web development icon" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">Web development</h4>

                    <p class="service-item-text">
                    High-quality development of sites at the professional level.
                    </p>
                </div>

                </li>

                <li class="service-item">

                <div class="service-icon-box">
                    <img src="/images/te.png" alt="mobile app icon" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">Mobile apps</h4>

                    <p class="service-item-text">
                    Professional development of applications for iOS and Android.
                    </p>
                </div>

                </li>

                <li class="service-item">

                <div class="service-icon-box">
                    <img src="/images/te.png" alt="camera icon" width="40">
                </div>

                <div class="service-content-box">
                    <h4 class="h4 service-item-title">Photography</h4>

                    <p class="service-item-text">
                    I make high-quality photos of any category at a professional level.
                    </p>
                </div>

                </li>

            </ul>

            </section>
        </article>`
    return aboutme
}

// Function to check if any paragraph is in edit mode
function isEditModeActive() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('edit') && urlParams.get('edit') === 'true';
}

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
  
window.addEventListener('DOMContentLoaded', function() {
    loadText();
  
    // Disable the input field initially
    var inputField = document.querySelector('.editable-input');
    inputField.disabled = true;
  
    if (isEditModeActive()) {
      toggleEditMode();
    }

    loadText()
});
