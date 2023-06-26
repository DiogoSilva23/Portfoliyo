
function editSidebarF() { 

    let userSidebarPhoneInput = document.getElementById("userSidebarPhone").innerHTML;
    let userSidebarBirthdayInput = document.getElementById("userSidebarBirthday").innerHTML;
    let userSidebarLocationInput = document.getElementById("userSidebarLocation").innerHTML;
    let userSidebarNameInput = document.getElementById("userSidebarName").innerHTML;

     

    document.getElementById("allsidebar").innerHTML = `<!--#SIDEBAR-->
        <div class="sidebar-info">

            <figure class="avatar-box">
            
            <img id="userSideBarImage" src="/images/te.png" alt="Richard hanrick" width="80">
            </figure>
            <input type="text" id="userSidebarImageInput" name="userImg" placeholder="Image URL" ></input>
            
            <div class="info-content">
            <h1 class="name" title="Richard hanrick" id="userSidebarName"></h1>
            <input type="text" id="userSidebarNameInput" name="userTitle" placeholder="title">  </input>

            <p class="title" id="userSidebarTitle">

            </p>
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


                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="phone-portrait-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Phone</p>

                <input type="text" id="userSidebarPhoneInput" name="userPhone" placeholder="Phone" ></input>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="calendar-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Birthday</p>

                <input type="text" id="userSidebarBirthdayInput" name="userBirthday" placeholder="Birthday" ></input>
                </div>

            </li>

            <li class="contact-item">

                <div class="icon-box">
                <ion-icon name="location-outline"></ion-icon>
                </div>

                <div class="contact-info">
                <p class="contact-title">Location</p>

                <input type="text" id="userSidebarLocationInput" name="userLocation" placeholder="Location" ></input>
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
            <button class="editBTN" style="display:block;" onclick='enterPortfolio()'>Cancel Edit</button>  
            <button class="editBTN" style="display:block;" onclick='saveSideBar()'>Save Edit</button>  
            

        </div>`;

    document.getElementById("userSidebarPhoneInput").value = userSidebarPhoneInput;
    document.getElementById("userSidebarBirthdayInput").value = userSidebarBirthdayInput;
    document.getElementById("userSidebarLocationInput").value = userSidebarLocationInput;
    document.getElementById("userSidebarNameInput").value = userSidebarNameInput;

  
}
async function saveSideBar(){
    userSideBarImage = document.getElementById("userSidebarImageInput");
    userSidebarName = document.getElementById("userSidebarNameInput");

    userSidebarPhone = document.getElementById("userSidebarPhoneInput");
    userSidebarBirthday = document.getElementById("userSidebarBirthdayInput");
    userSidebarLocation = document.getElementById("userSidebarLocationInput");
    //get the value from the input field

    userSideBarImage = userSideBarImage.value;
    userSidebarName = userSidebarName.value;

    userSidebarPhone = userSidebarPhone.value;
    userSidebarBirthday = userSidebarBirthday.value;
    userSidebarLocation = userSidebarLocation.value;

    

    const cookie = JSON.parse(readCookie("user"));
    console.log('BOLACHAAAAA', cookie);

    userSidebar = {
        userId : cookie.id,
        userSideBarImage : userSideBarImage,
        userSidebarName : userSidebarName,

        userSidebarPhone : userSidebarPhone,
        userSidebarBirthday : userSidebarBirthday,
        userSidebarLocation : userSidebarLocation
        
    }

    const reply = await makeRequest("https://localhost:8000/api/user/savePortfolioSidebar", {
    method: "POST",
    body: JSON.stringify(userSidebar),
    headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    // console log all values
    console.log(userSideBarImage);
    console.log(userSidebarName);
    console.log(userSidebarTitle);

    console.log(userSidebarPhone);
    console.log(userSidebarBirthday);
    console.log(userSidebarLocation);

    editSidebar = false;
    enterPortfolio();
}



function editAboutmeF() {
    let userAboutMeInput = document.getElementById("userAboutText").innerHTML;

    document.getElementById("allAboutMe").innerHTML = `

                
            <div class="about-text" id = "userAboutText">
                    <input type="textArea" id="userAboutMeInput" name="userAboutMe" placeholder="About me" ></input> 
                </div>

            <!-- service-->
            <button class="editBTN" style="display:block;" onclick='enterPortfolio()'>Cancel Edit</button>  
            <button class="editBTN" style="display:block;" onclick='saveAboutMe()'>Save Edit</button>  
        `;

    document.getElementById("userAboutMeInput").value = userAboutMeInput;
}


function addExperienceF() {

    //count the number of experiences
    let experienceCount = document.getElementById("ExperienceList").childElementCount;
    console.log(experienceCount);
  document.getElementById("ExperienceList").innerHTML += `
        
        
            <li class="service-item-exp" >
                <div class="service-content-box">
                    <h4 class="h4 service-item-title">
                        <div>
                            <label for="image">Image URL</label>
                            <input type="text" name="image" id="image" required>
                        </div> 
                        <div class="birthdate">
                            <label for="registerBirthdate">Initial Date</label>
                            <input type="date" name="initialDate" id="initialDate" required>
                        </div> 
                        <div class="birthdate">
                            <label for="registerBirthdate">Final Date</label>
                            <input type="date" name="finalDate" id="finalDate" required>
                        </div>
                        <div>
                            <label for="title">Title</label>
                            <input type="text" name="title" id="titleEXP" required>
                        </div>
                        <div>
                            <label for="description">Description</label>
                            <input type="text"  width="1000px" height="200px" name="description" id="description" required>
                        </div>
                    <button class="editBTN" style="display:inline;" onclick='saveExperience()'>Save</button>
                    <button class="editBTN" style="display:inline;" onclick='enterPortfolio()'>cancel</button>
                </div>
            </li>
        `;
}

async function saveExperience(){
    experienceImage = document.getElementById("image");
    experienceTitle = document.getElementById("titleEXP");
    experienceDescription = document.getElementById("description");
    experienceInitialDate = document.getElementById("initialDate");
    experienceFinalDate = document.getElementById("finalDate");

    experienceImage = experienceImage.value;
    experienceTitle = experienceTitle.value;
    experienceDescription = experienceDescription.value;
    experienceInitialDate = experienceInitialDate.value;
    experienceFinalDate = experienceFinalDate.value;
    
    const cookie = JSON.parse(readCookie("user"));
    console.log('BOLACHAAAAA', cookie);

    experience = {
        userId : cookie.id,
        experienceImage : experienceImage,
        experienceTitle : experienceTitle,
        experienceDescription : experienceDescription,
        experienceInitialDate : experienceInitialDate,
        experienceFinalDate : experienceFinalDate
    }
        console.log(experienceImage);
        console.log(experienceTitle);
        console.log(experienceDescription);
        console.log(experienceInitialDate);
        console.log(experienceFinalDate);

    const reply = makeRequest("https://localhost:8000/api/user/addExperience", {
        method: "POST",
        body: JSON.stringify(experience),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    editExperience = false;
    enterPortfolio();    
}
function saveAboutMe(){
    userAboutMe = document.getElementById("userAboutMeInput");
    const cookie = JSON.parse(readCookie("user"));
    userAboutMe = {
        userId: cookie.id,
        description: userAboutMe.value
    }

    const reply = makeRequest("https://localhost:8000/api/user/savePortfolioAboutMe", {
        method: "POST",
        body: JSON.stringify(userAboutMe),
        headers: { "Content-type": "application/json; charset=UTF-8" },
        })

    console.log(userAboutMe);
    editAboutMe = false;
    enterPortfolio();
}
