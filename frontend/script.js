const backendUrl = 'https://mini-dashboard-meteorologico-interactivo-0rzh.onrender.com';

function getWeather(city = null) {
  const input = document.getElementById('cityInput');
  const cityName = city || input.value;

  if (!cityName) return alert('Por favor ingresa una ciudad.');

  fetch(`${backendUrl}/weather?city=${cityName}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      displayWeather(data);
      saveFavorite(cityName);
    })
    .catch(err => alert('Error al obtener datos del clima: ' + err.message));
}

function displayWeather(data) {
  const container = document.getElementById('weatherResult');
  const html = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💧 Humedad: ${data.main.humidity}%</p>
    <p>🌬️ Viento: ${data.wind.speed} m/s</p>
    <p>📅 Pronóstico: ${data.weather[0].description}</p>
  `;
  container.innerHTML = html;
}

function saveFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
  }
}

function renderFavorites() {
  const list = document.getElementById('favorites');
  list.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(city => {
    const li = document.createElement('li');
    li.innerHTML = `<button onclick="getWeather('${city}')">${city}</button>`;
    list.appendChild(li);
  });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      fetch(`${backendUrl}/weather/geo?lat=${latitude}&lon=${longitude}`)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(err => alert('No se pudo obtener tu ubicación.'));
    });
  } else {
    alert('Tu navegador no soporta geolocalización.');
  }
}

window.onload = renderFavorites;

// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

const API_KEY = process.env.API_KEY;

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: 'No se pudo obtener el clima' });
  }
});

app.get('/weather/geo', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: 'No se pudo obtener el clima por geolocalización' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


