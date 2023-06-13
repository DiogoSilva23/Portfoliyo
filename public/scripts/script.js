var tablinks = document.getElementsByClassName("tablinks");
var tabcontents = document.getElementsByClassName("tabcontents");
var rows = document.getElementsByClassName("row");

function opentab(tabname) { /*FUNCTION TO SWITCH BETWEEN TABS IN SAME PAGE*/
    for (row in rows) {

    }
    for (tablink of tablinks) {
        tablink.classList.remove("activelink")
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("activetab")
    }
    event.currentTarget.classList.add("activelink");
    document.getElementById(tabname).classList.add('activetab')
}
