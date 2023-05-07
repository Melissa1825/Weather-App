let apiKey = "a0776b8bb0b1556bee1e5658c3acf0c4"
let city = 'Toronto'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemp)

function displayTemp(response) {
    console.log(response.data);
    let city = document.querySelector('#cityName').innerHTML = response.data.name;
    let temp = document.querySelector('#currentTemp').innerHTML = Math.round(response.data.main.temp);
    let desc = document.querySelector('#description').innerHTML = response.data.weather[0].main;
    let feel = document.querySelector('#feelsLike').innerHTML = Math.round(response.data.main.feels_like);
    let wind = document.querySelector('#wind').innerHTML = response.data.wind.speed;
    let humid = document.querySelector('#humid').innerHTML = response.data.main.humidity;
    let date = document.querySelector('#currentDate').innerHTML = formatDate(response.data.dt * 1000);
}

function formatDate(timestamp) {
    let date = new Date(timestamp);

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let min = date.getMinutes();
    if (min < 10) {
        minutes = `0${min}`;
    }

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()]
    return `${day}, ${month} ${hours}:${min}`
}

