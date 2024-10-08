const apiKey = "29b7e1ea29a0eb6a57839f3ad36c8914";
const baseApiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric";
const searchBox = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchButton");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather() {
    const city = searchBox.value.trim();  // Get city name from input field and trim whitespace
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    const apiUrl = `${baseApiUrl}&q=${encodeURIComponent(city)}`;  // Build API URL with city name

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        // Check if data is returned and update the UI
        if (data && data.main) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

            // Update the weather icon based on weather conditions
            const weatherCondition = data.weather[0].main;
            switch (weatherCondition) {
                case "Clouds":
                    weatherIcon.src = "clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "mist.png";
                    break;
                default:
                weatherIcon.src = "wind.png";
                    break;
            }
        } else {
            alert("No weather data found for the entered city");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Attach event listener to the button
searchBtn.addEventListener("click", checkWeather);
