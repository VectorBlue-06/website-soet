// Smooth preloader fade (avoid abrupt display toggles causing reflow)
window.addEventListener("load", function(){
	try {
		var preloader = document.getElementById("preloader");
		var content = document.getElementById("content");

		if(content){
			content.style.transition = 'opacity 350ms ease';
			content.style.opacity = '0';
			// ensure content is visible for layout (don't use display:none)
			content.style.display = 'block';
		}

		// small delay to allow layout to stabilise, then fade
		setTimeout(function(){
			if(preloader){
				preloader.style.transition = 'opacity 350ms ease, visibility 350ms ease';
				preloader.style.opacity = '0';
				preloader.style.visibility = 'hidden';
				preloader.style.pointerEvents = 'none';
			}
			if(content){
				content.style.opacity = '1';
			}
		}, 250);
	} catch(e) {
		// fail gracefully
		console.error(e);
	}
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

}

function initializeSharedFooterWidgets(){

if(window.__soetFooterWidgetsInitialized){
return;
}

let dateElement = document.getElementById("date");
let timeElement = document.getElementById("time");
let weatherElement = document.getElementById("weather");
let tempElement = document.getElementById("temp");
let lastUpdatedElement = document.getElementById("lastUpdated");
let visitorCountElement = document.getElementById("visitorCount");

if(!dateElement && !timeElement && !weatherElement && !tempElement && !lastUpdatedElement && !visitorCountElement){
return;
}

window.__soetFooterWidgetsInitialized = true;

if(dateElement){
dateElement.innerHTML = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" });
}

if(timeElement){
setInterval(function(){
timeElement.innerHTML = new Date().toLocaleTimeString("en-US", { hour12:false });
}, 1000);
}

if(lastUpdatedElement){
lastUpdatedElement.innerHTML = document.lastModified;
}

if(visitorCountElement){
try{
let count = localStorage.getItem("visitorCount");
count = count === null ? 1 : Number(count) + 1;
localStorage.setItem("visitorCount", count);
visitorCountElement.innerText = count.toLocaleString();
}
catch(error){
// Ignore storage failures.
}
}

if(weatherElement && tempElement){
fetch("https://api.openweathermap.org/data/2.5/weather?q=Ujjain&units=metric&appid=6ab4623b616a1ea162cf45d73c2dcb32")
.then(function(response){
return response.json();
})
.then(function(data){
if(data.weather){
let weatherDescription = data.weather[0].description;
weatherElement.innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
tempElement.innerHTML = Math.round(data.main.temp) + "°C";
}
})
.catch(function(){
// Ignore weather failures.
});
}

}

document.addEventListener("DOMContentLoaded", function(){
initializeSharedFooterWidgets();

});
