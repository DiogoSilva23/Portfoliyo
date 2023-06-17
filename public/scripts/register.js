const textarea = document.querySelector('textarea');
const description = document.querySelector('.description');
const descriptionEnterprise = document.querySelector('.descriptionEnterprise');

textarea.addEventListener('keyup', e => {
    textarea.style.height = "auto";
    description.style.height = "auto";
    descriptionEnterprise.style.height = "auto";
    let sHeight = e.target.scrollHeight;
    textarea.style.height = `${sHeight}px`;
});

function showtab(tab) {
    var professionalTab = document.getElementById('register');
    var enterpriseTab = document.getElementById('registerEnterprise');

    if (tab === 'register') {
        professionalTab.style.display = 'block';
        enterpriseTab.style.display = 'none';
    } else if (tab === 'registerEnterprise') {
        professionalTab.style.display = 'none';
        enterpriseTab.style.display = 'block';
    }
}