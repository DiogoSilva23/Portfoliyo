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
                <img id="sideBarImage" src="/images/te.png" alt="Richard hanrick" width="80">
                </figure>

                <div class="info-content">
                <h1 class="name" title="Richard hanrick" id="userSidebarName"></h1>

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
                <ion-icon name="mail-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Email</p>

                <a class="contact-link" id="userSidebarEmail"></a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="phone-portrait-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Phone</p>

                <a class="contact-link" id= "userSidebarPhone"></a>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="calendar-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Birthday</p>

                <time id= "userSidebarBirthday"></time>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="location-outline"></ion-icon>
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
            

        </div>
        </aside>`;
    return sidebar
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
        <button class="editBTN" onclick="toggleEditMode("exp")">Edit</edit-button>
        <button class="editBTN" onclick="addExperienceF()">Add new</edit-button>  
    </section>
    </ul>`;
}

function templateEducation(){
    document.getElementById("education4").innerHTML = `  <ul>

    <section class="service">

    <h2 class="h2 service-title"></h2>

    <ul class="service-list" id ="EducationsList">

    <li class="service-item">

    <div class="service-icon-box">
    <img src="https://ih1.redbubble.net/image.4190408899.0169/st,small,845x845-pad,1000x1000,f8f8f8.jpg
    " alt="design icon" width="40">
    </div>

    <div class="service-content-box">
    <h4 class="h4 service-item-title">2021 - current <br> Web design at ET Insitute.</h4>

    <p class="service-item-text">
    The most modern and high-quality design made at a professional level. UI/UX Design Training.
    The most modern and high-quality design made at a professional level. UI/UX Design Training.
    The most modern and high-quality design made at a professional level. UI/UX Design Training.
    The most modern and high-quality design made at a professional level. UI/UX Design Training.

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
        <button class="editBTN" onclick="toggleEditMode("edu")">Edit</edit-button>  
    </section>
    </ul>`;
}