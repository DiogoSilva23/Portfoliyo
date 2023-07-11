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
  const reply = await makeRequest("https://localhost:8000/api/visibleUsers", {
    method: "GET",
    body: JSON.stringify(),
    headers: { "Content-type": "application/json; charset=UTF-8" },
})
users = await reply.json();
return users;
}


