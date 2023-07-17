var arrayOffers = [];

const { get } = require("request");
const { portfolioSaveSidebar } = require("../../controllers/usersController");




function opentab(tabId, link) {
    // Obter o container parent do link clicado
    var container = link.parentNode;

    // Obter o container tabtitle parent do link clicado
    var tabTitlesContainer = container.parentNode;

    // Remover o activelink de todos os tablinks dentro do container tabtitle
    var tabLinks = tabTitlesContainer.getElementsByClassName('tablinks');
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove('activelink');
    }

    // Adicionar o activelink ao link clicado
    link.classList.add('activelink');

    // Remover o activetab de todos os tabcontents dentro do container
    var tabContents = container.parentNode.getElementsByClassName('tabcontents');
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove('activetab');
    }

    // Adicionar o activetab ao tabcontent respetivo
    var tabContent = document.getElementById(tabId);
    tabContent.classList.add('activetab');
}

function showMenu() {
  var menu = document.getElementById("menu");

  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function showFriendList() {
  var friendList = document.getElementById("friendList");

  if (friendList.style.display === "none") {
    friendList.style.display = "flex";
  } else {
    friendList.style.display = "none";
  }
}

async function insertVisibleUsers(){
  document.getElementById("userContainer").innerHTML = ""
  users = await getVisibleUsers()
  for (let i = 0; i < users.length; i++) {
      const user = users[i];
      document.getElementById("userContainer").innerHTML += `
          <div class="user">
          <p><b>Username: </b>${user.nick}</p>
          <p><b>Nome: </b>${user.userName}</p>
          <p><b>Email: </b>${user.email}</p>
          <button class="viewProfileButton" onclick="window.location.href = '/portfolio.html?user=${user.id}'"><ion-icon name="person-circle" size="large"></ion-icon></button>
      </div>
      `;
  }
}

async function getVisibleUsers() {
  const reply = await makeRequest(url+"/api/visibleUsers", {
    method: "GET",
    body: JSON.stringify(),
    headers: { "Content-type": "application/json; charset=UTF-8" },
})
users = await reply.json();
return users;
}

async function insertOffers(){
  document.getElementById("offerContainer").innerHTML = ""
  const cookie = JSON.parse(readCookie('user'))
  const id = cookie.id
  offers = await getOffers(id)
  if (offers.length == 0) {
    document.getElementById("offerContainer").innerHTML = `
    <div class="noJobOffers">
    <p>You currently have no Job Offers. Check out later for updates!</p>
</div>`
  }else{
    for (let i = 0; i < offers.length; i++) {
      const offer = offers[i];
      var data = offer.offerValidDate.split("T")[0];
      document.getElementById("offerContainer").innerHTML += `
      <div class="offer">
      <div class="companyDetails">
          <h2 class="companyName">${offer.companieName}</h2>
      </div>
  
      <div class="offerDetails">
          <h3 class="offerHeading">Job Offer</h3>
          <p class="offerDescription">${offer.offerDescription}</p>
  
          <div class="offerInfo">
              <div class="infoItem">
                  <span class="infoLabel">Duration:</span>
                  <span class="infoValue">${offer.offerDuration} months</span>
              </div>
  
              <div class="infoItem">
                  <span class="infoLabel">Total value:</span>
                  <span class="infoValue">${offer.offerValue}€</span>
              </div>
  
              <div class="infoItem">
                  <span class="infoLabel">Valid Until:</span>
                  <span class="infoValue">${data}</span>
              </div>
  
              <div class="infoItem">
                  <span class="infoLabel">Area of Work:</span>
                  <span class="infoValue">${offer.workspace}</span>
              </div>
          </div>
      </div>
      <button class="acceptRejectOffer">Accept</button>
      <button class="acceptRejectOffer">Reject</button>
      <button class="acceptRejectOffer" style="float:right; background-color:Black" onclick="addToCompare(${offer.idOffer})">Compare</button>
  </div>
      `;
  }
  }
}



async function getOffers(id) {
  const userId = {
    id: id
  }
  const reply = await makeRequest(url+"/api/user/offers", {
    method: "POST",
    body: JSON.stringify(userId),
    headers: { "Content-type": "application/json; charset=UTF-8" },
})
offers = await reply.json();
return offers;
}

function backHome() {
  // Define o URL da página de destino
  var url2 = url+"/index.html";

  // Redireciona o usuário para a página de destino
  window.location.href = url2;
}

function addToCompare(id) {
  if (arrayOffers.includes(id)) {
    alert("You already added this offer to compare!")
  }else if(arrayOffers.length == 3){
    alert("You can only compare 3 offers at a time!")
  }else{
    arrayOffers.push(id);
    loadCompare();
  }

}

async function loadCompare(){
  document.getElementById("compareContainer").innerHTML = ""
  for (let i = 0; i < arrayOffers.length; i++) {
    const id = arrayOffers[i];
    var offer = await getOffer(id)
    offer = offer[0]
    var data = offer.offerValidDate.split("T")[0];
    console.log(offer);
    document.getElementById("compareContainer").innerHTML += `
    <div class="offer">
    <div class="companyDetails">
        <h2 class="companyName">${offer.companieName}</h2>
    </div>

    <div class="offerDetails">
        <p class="offerDescription">${offer.offerDescription}</p>

        <div class="offerInfo">
            <div class="infoItem">
                <span class="infoLabel">Duration:</span>
                <span class="infoValue">${offer.offerDuration} months</span>  
            </div>

            <div class="infoItem">
                <span class="infoLabel">Total value:</span>
                <span class="infoValue">${offer.offerValue}€</span> 
            </div>

            <div class="infoItem">
                <span class="infoLabel">Valid Until:</span>
                <span class="infoValue">${data}</span>

            </div>

            <div class="infoItem">
                <span class="infoLabel">Area of Work:</span>
                <span class="infoValue">${offer.workspace}</span>
            </div>
        </div>
    </div>
</div>
    `;
  }
}


async function getOffer(id){
  const offerId = {
    id: id
  }
  const reply = await makeRequest(url+"/api/user/offer", {
    method: "POST",
    body: JSON.stringify(offerId),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })  

  //return the offer found
  offer = await reply.json();
  return offer;


}
