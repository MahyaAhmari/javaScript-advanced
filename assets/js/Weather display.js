const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toPersianNumber = (value) =>
    String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);

const weatherCodes = {
    0: { text: 'آفتابی', emoji: '☀️' },
    1: { text: 'نیمه آفتابی', emoji: '🌤️' },
    2: { text: 'نیمه ابری', emoji: '⛅' },
    3: { text: 'ابری', emoji: '☁️' },
    45: { text: 'مه', emoji: '🌫️' },
    48: { text: 'مه یخ‌زده', emoji: '🌫️' },
    51: { text: 'نم‌نم باران سبک', emoji: '🌦️' },
    53: { text: 'نم‌نم باران متوسط', emoji: '🌦️' },
    55: { text: 'نم‌نم باران شدید', emoji: '🌧️' },
    56: { text: 'نم‌نم باران یخ‌زده سبک', emoji: '🌧️' },
    57: { text: 'نم‌نم باران یخ‌زده شدید', emoji: '🌧️' },
    61: { text: 'باران سبک', emoji: '🌧️' },
    63: { text: 'باران متوسط', emoji: '🌧️' },
    65: { text: 'باران شدید', emoji: '🌧️' },
    66: { text: 'باران یخ‌زده سبک', emoji: '🌧️' },
    67: { text: 'باران یخ‌زده شدید', emoji: '🌧️' },
    71: { text: 'بارش برف سبک', emoji: '🌨️' },
    73: { text: 'بارش برف متوسط', emoji: '🌨️' },
    75: { text: 'بارش برف سنگین', emoji: '❄️' },
    77: { text: 'دانه‌های برف', emoji: '🌨️' },
    80: { text: 'رگبار سبک', emoji: '🌦️' },
    81: { text: 'رگبار متوسط', emoji: '🌧️' },
    82: { text: 'رگبار شدید', emoji: '⛈️' },
    85: { text: 'رگبار برف سبک', emoji: '🌨️' },
    86: { text: 'رگبار برف سنگین', emoji: '❄️' },
    95: { text: 'رعد و برق', emoji: '⛈️' },
    96: { text: 'رعد و برق با تگرگ سبک', emoji: '⛈️' },
    99: { text: 'رعد و برق با تگرگ شدید', emoji: '⛈️' },
};

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("لطفاً یک شهر وارد کنید");
        return;
    }
    await getWeather(city);
});

const getWeather = async (city) => {
    try {
        const geoRez = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fa`);

        if (!geoRez.ok) {
            throw new Error(`HTTP Error: ${geoRez.status}`);
        };

        const geoData = await geoRez.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("شهر پیدا نشد");
        }

        const {latitude, longitude, name, country} = geoData.results[0];
        const weatherRez = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        
        if (!weatherRez.ok) {
            throw new Error(`HTTP Error: ${weatherRez.status}`);
        };

        const weatherData = await weatherRez.json();

        displayWeather(name, country, weatherData.current);
    } catch (error) {
        console.error("Error fetching weather data:", error);

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <div class="text-6xl mb-4">😕</div>
            <p class="text-red-400 font-bold">${error.message || 'خطا در دریافت اطلاعات'}</p>
            <p class="text-slate-400 text-sm mt-2">لطفاً اسم شهر رو درست وارد کن</p>
        `;

        throw error;
    };
};

const displayWeather = (city, country, currentWeather) => {
    const resultDiv = document.getElementById("result");
    const { temperature_2m, relative_humidity_2m, weather_code, wind_speed_10m } = currentWeather;
    const weatherInfo = weatherCodes[weather_code] || { text: 'نامشخص', emoji: '❓' };

    resultDiv.innerHTML = `
        <div class="text-6xl mb-4">${weatherInfo.emoji}</div>
        <h2 class="text-2xl font-bold mb-2">${city}, ${country}</h2>
        <p class="text-slate-400 mb-4">${weatherInfo.text}</p>
        <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
                <div class="text-3xl font-bold text-cyan-400">${toPersianNumber(Math.round(temperature_2m))}°</div>
                <div class="text-slate-400">دما</div>
            </div>
            <div>
                <div class="text-3xl font-bold text-cyan-400">${toPersianNumber(relative_humidity_2m)}%</div>
                <div class="text-slate-400">رطوبت</div>
            </div>
            <div>
                <div class="text-3xl font-bold text-cyan-400">${toPersianNumber(wind_speed_10m)}</div>
                <div class="text-slate-400">باد (km/h)</div>
            </div>
        </div>
    `;
};

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});