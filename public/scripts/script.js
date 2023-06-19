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

/* Responsive Menu BackUp
function toggleMenu() {
  var regularMenu = document.getElementById("regularMenu");
  var responsiveMenu = document.getElementById("responsiveMenu");

  if (regularMenu.style.display === "none") {
    regularMenu.style.display = "block";
    responsiveMenu.classList.remove("show");
  } else {
    regularMenu.style.display = "none";
    responsiveMenu.classList.add("show");
  }
}

window.addEventListener("resize", function() {
  var screenWidth = window.innerWidth;
  var regularMenu = document.getElementById("regularMenu");
  var responsiveMenu = document.getElementById("responsiveMenu");

  if (screenWidth > 750) {
    regularMenu.style.display = "block";
    responsiveMenu.classList.remove("show");
  }
});*/