//api key, api url & axios 
function search(city) {
    let apiKey = '9acca644b3a6c9504b178f06o3c4t156'
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`

    axios.get(apiUrl).then(showTemp)
}

//default city 
search ('Toronto')


//city search function
document.querySelector('#citySearch').addEventListener('submit', handleSearch)

function handleSearch(event) {
    event.preventDefault();
    let cityName = document.querySelector('#cityInput')
    search(cityName.value)
}

//temp display
function showTemp(response) {
console.log(response)
document.querySelector('#currentCity').innerHTML = response.data.city;
celTemp = response.data.temperature.current;
document.querySelector('#currentTemp').innerHTML = Math.round(celTemp);
document.querySelector('#description').innerHTML = response.data.condition.description;
document.querySelector('#feelsLike').innerHTML = Math.round(response.data.temperature.feels_like);
document.querySelector('#windSpeed').innerHTML = Math.round(response.data.wind.speed);
document.querySelector('#humid').innerHTML = response.data.temperature.humidity;
document.querySelector('#icon').setAttribute('src', `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
document.querySelector('#icon').setAttribute('alt', response.data.condition.description);
document.querySelector('#date').innerHTML = formatDate(response.data.time * 1000)

//call for daily forecast
dailyForecast(response.data.coordinates);

}

//date
function formatDate(timestamp){
    let date = new Date(timestamp);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = days[date.getDay()];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];

    let day = date.getDate();

    //time not right for different time zones??
    let hours = date.getHours()
    if (hours < 10) {
        hours = `0${hours}`
    }

    let min = date.getMinutes()
    if (min < 10) {
        min = `0${min}`
    }
    
    return `${weekday}, ${month} ${day} ${hours}:${min}`
}


//forecast loop & HTML integration
function displayForecast(response) { 
    console.log(response.data)
    let forecast = response.data.daily;

    let forecastElement = document.querySelector('#dailyForecast');

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if (index < 7 && index > 0)  {
        forecastHTML = forecastHTML + 
        `
                <div class="col-2">
                        <p>${formatDailyDate(forecastDay.time)}</p>
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="dailyIcon">
                        <div>${Math.round(forecastDay.temperature.maximum)}° / ${Math.round(forecastDay.temperature.minimum)}°</div>
                </div>  
        `;
    }
    })
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML
}

function formatDailyDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return days[day];
}


//daily forecast api
function dailyForecast(coordinates) {
    //console.log(coordinates);
    let apiKey = '9acca644b3a6c9504b178f06o3c4t156';
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}