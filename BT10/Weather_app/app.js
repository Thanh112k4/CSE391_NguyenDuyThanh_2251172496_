const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const historyList = document.getElementById("historyList");

let searchHistory =
    JSON.parse(localStorage.getItem("weatherHistory")) || [];

renderHistory();

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {

    showLoading();

    try {

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if (!response.ok) {
            throw new Error("Không tìm thấy thành phố");
        }

        const data = await response.json();

        displayWeather(city, data);

        saveHistory(city);

        hideLoading();

    } catch (error) {

        hideLoading();

        showError(error.message);
    }
}

function displayWeather(city, data) {

    errorBox.classList.add("hidden");

    const current = data.current_condition[0];

    weatherResult.innerHTML = `
        <div class="weather-card">
            <h2>${city}</h2>

            <img src="${current.weatherIconUrl[0].value}">

            <h3>${current.temp_C}°C</h3>

            <p>
                ${current.weatherDesc[0].value}
            </p>

            <p>
                💧 Độ ẩm: ${current.humidity}%
            </p>

            <p>
                🌬 Gió: ${current.windspeedKmph} km/h
            </p>
        </div>
    `;
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherResult.innerHTML = "";
    errorBox.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {

    weatherResult.innerHTML = "";

    errorBox.textContent = message;

    errorBox.classList.remove("hidden");
}

function saveHistory(city) {

    city = city.trim();

    searchHistory = searchHistory.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    searchHistory.unshift(city);

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(searchHistory)
    );

    renderHistory();
}

function renderHistory() {

    historyList.innerHTML = "";

    searchHistory.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {

            cityInput.value = city;

            getWeather(city);
        });

        historyList.appendChild(li);
    });
}