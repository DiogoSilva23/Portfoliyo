const textarea = document.querySelector('textarea');
const description = document.querySelector('.description');

textarea.addEventListener('keyup', e => {
    textarea.style.height = "auto";
    description.style.height = "auto";
    let sHeight = e.target.scrollHeight;
    textarea.style.height = `${sHeight}px`;

});