const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

const API_KEY = "909cfc4a21b2f7836970ff9c27c894dd";
const IMAGE_PATH = "./"; // Ensure images are stored in the correct path

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherData = await response.json();

        if (weatherData.cod === '404') {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            console.error("City not found");
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        // Convert temperature from Kelvin to Celsius
        temperature.textContent = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.textContent = weatherData.weather[0].description;
        humidity.textContent = `${weatherData.main.humidity}%`;
        windSpeed.textContent = `${weatherData.wind.speed} Km/H`;

        // Set weather image based on condition
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        let imageSrc = "default.png"; // Default image if none match

        if (weatherCondition.includes("cloud")) {
            imageSrc = "cloud.png";
        } else if (weatherCondition.includes("clear")) {
            imageSrc = "clear.png";
        } else if (weatherCondition.includes("rain")) {
            imageSrc = "rain.png";
        } else if (weatherCondition.includes("mist")) {
            imageSrc = "mist.png";
        } else if (weatherCondition.includes("snow")) {
            imageSrc = "snow.png";
        }

        weatherImg.src = IMAGE_PATH + imageSrc;

        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
    }
}

// Search button event listener
searchBtn.addEventListener("click", () => checkWeather(inputBox.value));

// Allow pressing "Enter" to trigger search
inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(inputBox.value);
    }
});
