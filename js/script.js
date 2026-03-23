window.addEventListener("load", function(){

setTimeout(function(){

document.getElementById("preloader").style.display = "none";
document.getElementById("content").style.display = "block";

},1000);

});
let currentSize = 16;

function changeFontSize(action){

if(action === -1){
currentSize -= 1;
}

if(action === 1){
currentSize += 1;
}

if(action === 0){
currentSize = 16;
}

document.body.style.fontSize = currentSize + "px";

}

function translatePage(lang){

let select = document.querySelector(".goog-te-combo");

if(select){
select.value = lang;
select.dispatchEvent(new Event("change"));
}

function applyTheme(mode){

let toggleButton = document.getElementById("theme-toggle");

if(mode === "dark"){
document.body.classList.add("dark-mode");
if(toggleButton){
toggleButton.textContent = "Light";
}
}
else{
document.body.classList.remove("dark-mode");
if(toggleButton){
toggleButton.textContent = "Dark";
}
}

}

function toggleDarkMode(){

let isDark = document.body.classList.contains("dark-mode");
let nextMode = isDark ? "light" : "dark";

localStorage.setItem("theme", nextMode);
applyTheme(nextMode);

}

document.addEventListener("DOMContentLoaded", function(){

let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

});

}
