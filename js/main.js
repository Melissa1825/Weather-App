//Temp display function
function displayTemp(response) {
    //console.log(response.data);
    let city = document.querySelector('#cityName').innerHTML = response.data.name;
    let temp = document.querySelector('#currentTemp').innerHTML = Math.round(response.data.main.temp);
    let desc = document.querySelector('#description').innerHTML = response.data.weather[0].main;
    let feel = document.querySelector('#feelsLike').innerHTML = Math.round(response.data.main.feels_like);
    let wind = document.querySelector('#wind').innerHTML = response.data.wind.speed;
    let humid = document.querySelector('#humid').innerHTML = response.data.main.humidity;
    let date = document.querySelector('#currentDate').innerHTML = formatDate(response.data.dt * 1000);
    //*******setup icon for brokend img!!!********
    let icon = document.querySelector('#icon').setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celTemp = response.data.main.temp;
}

//******WHEN MINUTES END IN 0 TIME NOT FORMATTING PROPERLY******* */
//Date formatting
function formatDate(timestamp) {
    let date = new Date(timestamp);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()]

    let dayNum = date.getDate()

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let min = date.getMinutes();
    if (min < 10) {
        minutes = `0${min}`;
    }

    return `${day}, ${month} ${dayNum} ${hours}:${min}`
}


//Default city on load
function search(city) {
    let apiKey = "a0776b8bb0b1556bee1e5658c3acf0c4"
    //let city = 'london'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayTemp)
}

search('Toronto')


//Search Engine
document.querySelector('#searchForm').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    let citySearch = document.querySelector('#cityInput').value
    search(citySearch)
    //console.log(citySearch)
}

//Unit Conversion Cel to Far
//Cel to Far
document.querySelector('#far').addEventListener('click', convertToFar)

function convertToFar(event) {
    event.preventDefault();
    let farTemp = (celTemp * 9) / 5 + 32;
    document.querySelector('#currentTemp').innerHTML = Math.round(farTemp);
}

let celTemp = null;

//Far to Cel
let celLink = document.querySelector('#cel').addEventListener('click', convertToCel);

function convertToCel(event) {
    event.preventDefault();
    document.querySelector('#currentTemp').innerHTML = Math.round(celTemp);
}

