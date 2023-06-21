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
        phoneNumber: "",
        birthDate: portfolio.birthDate,
        location: portfolio.location
    }
    var sidebar = drawSidebar(userInfoSidebar)
    const userInfoAboutme = {
        description: portfolio.description
    }
    var aboutme = drawAboutme()
    var main = document.getElementById("portfolioMain")
    main.innerHTML = sidebar + aboutme
}

function drawSidebar(userInfoSidebar){
    var sidebar =    `<!--#SIDEBAR-->
        <aside class="sidebar" data-sidebar>

        <div class="sidebar-info">

            <figure class="avatar-box">
            <img src="/images/te.png" alt="Richard hanrick" width="80">
            </figure>

            <div class="info-content">
            <h1 class="name" title="Richard hanrick">`+userInfoSidebar.name+`</h1>

            <p class="title">`+userInfoSidebar.title+`</p>
            </div>

            <button class="info_more-btn" data-sidebar-btn>
            <span>Show Contacts</span>

            <ion-icon name="chevron-down"></ion-icon>
            </button>

        </div>

        <div class="sidebar-info_more">

            <div class="separator"></div>

            <ul class="contacts-list">

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Email</p>

                <a href="mailto:richard@example.com" class="contact-link" id="userEmail">`+userInfoSidebar.email+`</a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="phone-portrait-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Phone</p>

                <a href="tel:+12133522795" class="contact-link">`+userInfoSidebar.phoneNumber+`</a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="calendar-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Birthday</p>

                <time datetime="1982-06-23">`+userInfoSidebar.birthDate+`</time>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="location-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Location</p>

                <address>`+userInfoSidebar.location+`</address>
                </div>

            </li>

            </ul>

            <div class="separator"></div>

            <ul class="social-list">
            <li class="social-item">
                <a href="https://www.facebook.com" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
                </a>
            </li>
            
            <li class="social-item">
                <a href="https://www.twitter.com" class="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
                </a>
            </li>
            
            <li class="social-item">
                <a href="https://www.instagram.com" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
                </a>
            </li>
            </ul>        

        </div>

        </aside>`
    return sidebar
}

function drawAboutme(){
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
                    <textarea class="editable-input" placeholder="Enter your text here" disabled></textarea>

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
