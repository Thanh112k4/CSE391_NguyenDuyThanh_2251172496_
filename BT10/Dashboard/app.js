const weatherDiv = document.getElementById("weather");
const countryDiv = document.getElementById("country");
const usersDiv = document.getElementById("users");
const dogsDiv = document.getElementById("dogs");
const loadTime = document.getElementById("loadTime");
const refreshBtn = document.getElementById("refreshBtn");

function showLoading() {
    weatherDiv.innerHTML = '<p class="loading">Loading...</p>';
    countryDiv.innerHTML = '<p class="loading">Loading...</p>';
    usersDiv.innerHTML = '<p class="loading">Loading...</p>';
    dogsDiv.innerHTML = '<p class="loading">Loading...</p>';
}

function showError(element, msg) {
    element.innerHTML = `<p class="error">${msg}</p>`;
}

function renderWeather(data) {
    weatherDiv.innerHTML = `
        <p>🌡️ Nhiệt độ: ${data.current_weather.temperature}°C</p>
        <p>💨 Gió: ${data.current_weather.windspeed} km/h</p>
    `;
}

function renderCountry(data) {
    const country = data[0];

    countryDiv.innerHTML = `
        <p><b>${country.name.common}</b></p>
        <p>🏛️ Thủ đô: ${country.capital}</p>
        <p>👥 Dân số: ${country.population.toLocaleString()}</p>
        <img src="${country.flags.png}" width="120">
    `;
}

function renderUsers(data) {
    usersDiv.innerHTML = "";

    data.results.forEach(user => {
        const div = document.createElement("div");

        div.className = "user";

        div.innerHTML = `
            <strong>${user.name.first} ${user.name.last}</strong>
            <br>
            ${user.email}
        `;

        usersDiv.appendChild(div);
    });
}

function renderDogs(data) {
    dogsDiv.innerHTML = '<div class="dogs"></div>';

    const container = dogsDiv.querySelector(".dogs");

    data.message.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        container.appendChild(img);
    });
}

async function loadDashboard() {

    showLoading();

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
        ).then(r => r.json()),

        fetch(
            "https://restcountries.com/v3.1/name/vietnam"
        ).then(r => r.json()),

        fetch(
            "https://randomuser.me/api/?results=5"
        ).then(r => r.json()),

        fetch(
            "https://dog.ceo/api/breeds/image/random/4"
        ).then(r => r.json())
    ]);

    if (results[0].status === "fulfilled") {
        renderWeather(results[0].value);
    } else {
        showError(weatherDiv, "Không tải được thời tiết");
    }

    if (results[1].status === "fulfilled") {
        renderCountry(results[1].value);
    } else {
        showError(countryDiv, "Không tải được quốc gia");
    }

    if (results[2].status === "fulfilled") {
        renderUsers(results[2].value);
    } else {
        showError(usersDiv, "Không tải được users");
    }

    if (results[3].status === "fulfilled") {
        renderDogs(results[3].value);
    } else {
        showError(dogsDiv, "Không tải được ảnh chó");
    }

    const time = Date.now() - startTime;

    loadTime.textContent = `⏱️ Data loaded in ${time} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();