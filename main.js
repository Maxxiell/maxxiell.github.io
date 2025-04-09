const header = document.getElementById("header");
const hText = document.querySelector(".left1 h1");
const pText = document.querySelector(".left1 p");
const cText = document.querySelector(".centered h2");
const c3Text = document.querySelector(".centered h3");
const aText = document.querySelector(".centered a");

header.addEventListener("mouseover", () => {
    document.body.style.background = 'linear-gradient(to right,rgb(255, 30, 0), #86a7bb)';
    document.body.style.transition = 'background 2s ease-in-out';
    header.style.background = 'linear-gradient(to right, #fff, rgba(252, 252, 252, 0.12))';
    header.style.boxShadow = ' 10px 5px 0px yellow';
    header.style.border = '1px solid yellow';
    hText.style.color = 'black';
    pText.style.color = 'black';
    cText.style.color = 'black';
    c3Text.style.color = '#5c5c5c';
    aText.style.color = 'white';
});

header.addEventListener("mouseout", () => {
    document.body.style.background = '';
    document.body.style.transition = '';
    header.style.background = '';
    header.style.boxShadow = '';
    header.style.border = '';
    hText.style.color = '';
    pText.style.color = '';
    cText.style.color = '';
    c3Text.style.color = '';
    aText.style.color = '';
});