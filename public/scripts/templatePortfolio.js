function templatePortfolio(){
    var sidebar = templateSidebar()
    var aboutme = templateAboutme()
    

    var main = document.getElementById("portfolioMain")
    main.innerHTML = sidebar + aboutme
    templateExperience()
    templateEducation()
}

function templateSidebar(){
    var sidebar = `<!--#SIDEBAR-->
        
        <aside class="sidebar" data-sidebar id="allsidebar">
            <div class="sidebar-info">

                <figure class="avatar-box">
                <img id="sideBarImage" src="/images/te.png" width="80">
                </figure>

                <div class="info-content">
                <h1 class="name" id="userSidebarName"></h1>

                <p class="title" id="userSidebarTitle"> </p>
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
                <ion-icon name="mail"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Email</p>

                <a class="contact-link" id="userSidebarEmail"></a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="phone-portrait-sharp"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Phone</p>

                <a class="contact-link" id= "userSidebarPhone"></a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="calendar"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Birthday</p>

                <time id= "userSidebarBirthday"></time>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="location"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Location</p>

                <address id= "userSidebarLocation"></address>
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
            <button class="editBTN" onclick='toggleEditMode("sidebar")'>Edit</button>   
            <button class="offerBTN" id="offerBTN" onclick='openOfferPopUp()'>Make Offer</button>

            

        </div>
        </aside>`;
    return sidebar
}

function openOfferPopUp() {
    const makeOfferPopUp = document.querySelector('.makeOfferPopUp');
    makeOfferPopUp.classList.add('activePopUp');
}

function closeOfferPopUp() {
    const makeOfferPopUp = document.querySelector('.makeOfferPopUp');
    makeOfferPopUp.classList.remove('activePopUp');
}

function templateAboutme(){
    var aboutme = `<div class="main-content">

        <!--#ABOUT-->
        <article class="about  active" data-page="about">

            <header>
            <h2 class="h2 article-title">About me</h2>
            </header>

            <section class="about-section"  id="allAboutMe">
                <div class="about-text" id = "userAboutText">
                    f
                </div>
                <button class="editBTN" onclick='toggleEditMode("aboutme")'>Edit</button>  
            </section>
            <hr>
            <section>
            <div class="tabtitles">
                <p class="tablinks" onclick="opentab('experience4', this)">Experience</p>
                <p class="tablinks" onclick="opentab('education4', this)">Education</p>
            </div>
            <div class="tabcontents activetab" id="experience4">
                
            </div>
            <div class="tabcontents" id="education4">
                
            </div>
            
            <div class="makeOfferPopUp">
                <span class="closeIcon" onclick='closeOfferPopUp()'>
                    <ion-icon name="close-outline""></ion-icon>
                </span>

                <h1>Send Offer</h1>

                <div class="offerInputs">
                    <p class="contact-title">Description</p>
                    <input type="text" id="offerDescription" name="offerDescription" placeholder="Insert the job description here..."></input>
                </div>

                <div class="offerInputs">
                    <p class="contact-title">Area of Work</p>
                    <input type="text" id="offerAreaOfWork" name="offerAreaOfWork" placeholder="Insert the area of work here..."></input>
                </div>

                <div class="offerInputs">
                    <p class="contact-title">Duration</p>
                    <input type="text" id="offerDuration" name="offerDuration" placeholder="Insert the duration here..."></input>
                </div>

                <div class="offerInputs">
                    <p class="contact-title">value</p>
                    <input type="text" id="offerValue" name="offerValue" placeholder="Insert the value here..."></input>
                </div>

                <div class="offerInputs">
                    <p class="contact-title">Valid until</p>
                    <input type="date" id="offerValidationDate" name="offerValidationDate" placeholder="offerValidationDate"></input>
                </div>

                <button class="submitOffer" onclick='enviarProposta()'>Submit Offer</button>
            </div>
            </section>

            <!-- service-->
            
        </article>`;
    return aboutme
}

function templateExperience(){
    document.getElementById("experience4").innerHTML = `             <ul>

        <section class="service">

    <h2 class="h2 service-title"></h2>

    <ul class="service-list" id="ExperienceList">


    </ul>
        <button class="editBTN" onclick="addExperienceF()">Add new</edit-button>  
    </section>
    </ul>`;
}

function templateEducation(){
    document.getElementById("education4").innerHTML = `  <ul>

        <section class="service">

    <h2 class="h2 service-title"></h2>

    <ul class="service-list" id ="EducationsList">

    </ul>
        <button class="editBTN" onclick="addEducationF()">Add new</edit-button>  
    </section>
    </ul>`;
}