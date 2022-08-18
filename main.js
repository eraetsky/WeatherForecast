const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const apiKey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation (city)
{
    const resp = await fetch(url(city),{origin: "cors"});
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(data)
{
    const temp = KtoC(data.main.temp);
    const weather = document.createElement("div");
    weather.classList.add("weather");
    console.log(data);
    weather.innerHTML = `
    <small>There are</small>
    <h2>${temp}°C</h2>
    <p>in ${search.value}</p>
    <img src = "https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
    <small>${data.weather[0].main }</small>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Pressure: ${data.main.pressure} Pa</p> 
    <p>Wind speed: ${data.wind.speed} m/s </p>
    
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function KtoC (Ktemperature)
{
    return (Ktemperature - 273.15).toFixed(1);
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;
    if (city)
    {
        getWeatherByLocation(city);
    }
});
