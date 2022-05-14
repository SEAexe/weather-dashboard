var inputValue = document.querySelector("#input-value");
var searchBtn = document.querySelector("#search-btn")
var cityName = document.querySelector('#city-name')
var tempMain = document.querySelector('#temp-main')
var windMain = document.querySelector('#wind-main')
var humidMain = document.querySelector('#humid-main')
var uvIndexMain = document.querySelector('#uvindex-main')
var recentHistory = document.querySelector('#recentHistory')
var customUVIndex = document.querySelector('#uvindex-main')
var fiveDayFore = document.querySelector('#fivedayfore')
var dates = document.querySelector('#dates')
var currentDate = moment();

function activate(){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&exclude=minutely,hourly,alerts&appid=c78c558b4a973e2264ce5c9d04ed7ac8"
    fetch(requestUrl)
        .then(function (response){
            if (response.status > 199 && response.status < 300){
                cityName.textContent = inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1) + currentDate.format("(M/DD/YYYY)")
                createHistory();
                }else {
                    alert("Enter a valid city.")
                    return;
                }
            return response.json()
        })
        .then((data) => displayWeather(data))    
};

function displayWeather(data) {
    var { lat } = data.coord;
    var { lon } = data.coord;
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=c78c558b4a973e2264ce5c9d04ed7ac8"

    fetch(requestUrl)
        .then((response) => response.json())
        .then((datas) => printWeather(datas))  

function printWeather(datas){
    console.log(requestUrl)

    var{ temp } = datas.current;
    var{ humidity } = datas.current;
    var { uvi } = datas.current;
    var { wind_speed } = datas.current;
    
    tempMain.textContent = "Temp: " + temp + "°F"
    windMain.textContent = "Wind: " + wind_speed + "MPH"
    humidMain.textContent = "Humidity: " + humidity + "%"
    uvIndexMain.textContent = uvi
 
    if(uvi >= 0 && uvi <= 2) {
        document.getElementById("uvindex-main").style.backgroundColor = "#006400"
        document.getElementById("uvindex-main").style.borderColor = "#006400"
    }else if(uvi > 2 && uvi <= 5) {
        document.getElementById("uvindex-main").style.backgroundColor = "#c5d325"
        document.getElementById("uvindex-main").style.borderColor = "#c5d325"
    }else if(uvi > 5 && uvi <= 10) {
        document.getElementById("uvindex-main").style.backgroundColor = "red"
        document.getElementById("uvindex-main").style.borderColor = "red"
    }else if (uvi >= 11) {
        document.getElementById("uvindex-main").style.backgroundColor = "#670167"
        document.getElementById("uvindex-main").style.borderColor = "#670167"
    }

    for(i = 0; i <= 4; i++){
    var tommorow = moment().add([i + 1],'days').format("(M/DD/YYYY)")
    var { day } = datas.daily[i].temp
    var { icon } = datas.daily[i].weather[0]
    var { wind_speed } = datas.daily[i]
    var { humidity } = datas.daily[i]
    
    console.log(icon)
    var resultCard = document.createElement('div');
    var imgContent = document.createElement('img');
    var bodyContentEl = document.createElement('p');
    var bodyContentWind = document.createElement('p');
    var bodyContentHumid = document.createElement('p');
    var titleEl = document.createElement('h5');
    var iconCode = icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    resultCard.classList.add('custom-card', 'mx-4', 'card', 'border', 'border-dark', 'shadow');
    titleEl.classList.add('card-title', 'fw-bold', 'text-center', 'mb-4');
    imgContent.classList.add('wicon');
    
    titleEl.textContent = tommorow
    imgContent.setAttribute('src', iconurl)
    bodyContentEl.textContent = 'Temp: ' + day + '°F'
    bodyContentWind.textContent = 'Wind: ' + wind_speed + 'MPH'
    bodyContentHumid.textContent = 'Humidity: ' + humidity + '%'

    resultCard.appendChild(titleEl);
    resultCard.appendChild(imgContent);
    resultCard.appendChild(bodyContentEl);
    resultCard.appendChild(bodyContentWind);
    resultCard.appendChild(bodyContentHumid);
    fiveDayFore.appendChild(resultCard);

console.log(resultCard)

}}};

function createHistory() {
    var history = document.createElement('button')
    history.classList.add('btn', 'btn-secondary', 'w-100', 'my-2', 'shadow')
    history.textContent = inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1)
    recentHistory.append(history)
}

searchBtn.addEventListener("click", activate);