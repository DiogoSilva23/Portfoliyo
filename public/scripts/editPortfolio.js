
function editSidebarF() { 

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
            <input type="text" id="userSidebarTitleInput" name="userTitle" placeholder="title">  </input>
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

                <input type="text" id="userSidebarEmailInput" name="userEmail" placeholder="Email" ></input>
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
}
function saveSideBar(){
  userSideBarImage = document.getElementById("userSidebarImageInput");
  userSidebarName = document.getElementById("userSidebarNameInput");
  userSidebarTitle = document.getElementById("userSidebarTitleInput");
  userSidebarEmail = document.getElementById("userSidebarEmailInput");
  userSidebarPhone = document.getElementById("userSidebarPhoneInput");
  userSidebarBirthday = document.getElementById("userSidebarBirthdayInput");
  userSidebarLocation = document.getElementById("userSidebarLocationInput");
  //get the value from the input field

  userSideBarImage = userSideBarImage.value;
  userSidebarName = userSidebarName.value;
  userSidebarTitle = userSidebarTitle.value;
  userSidebarEmail = userSidebarEmail.value;
  userSidebarPhone = userSidebarPhone.value;
  userSidebarBirthday = userSidebarBirthday.value;
  userSidebarLocation = userSidebarLocation.value;
  // console log all values
  console.log(userSideBarImage);
  console.log(userSidebarName);
  console.log(userSidebarTitle);
  console.log(userSidebarEmail);
  console.log(userSidebarPhone);
  console.log(userSidebarBirthday);
  console.log(userSidebarLocation);

  editSidebar = false;
}

function editAboutmeF() {
  document.getElementById("allAboutMe").innerHTML = `

                
          <div class="about-text" id = "userAboutText">
                    <input type="textArea" id="userAboutMeInput" name="userAboutMe" placeholder="About me" ></input> 
                </div>

            <!-- service-->
            <button class="editBTN" style="display:block;" onclick='enterPortfolio()'>Cancel Edit</button>  
            <button class="editBTN" style="display:block;" onclick='saveAboutMe()'>Save Edit</button>  
        `;
}
function saveAboutMe(){
    userAboutMe = document.getElementById("userAboutMeInput");

    userAboutMe = userAboutMe.value;

    console.log(userAboutMe);
    editAboutMe = false;
}
