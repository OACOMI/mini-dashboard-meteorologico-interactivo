// Obtenemos referencias a los elementos HTML por su id para manipularlos
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

// Detectamos si estamos en entorno local o desplegado
const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const backendUrl = isLocal 
  ? 'http://localhost:3000' 
  : 'https://mini-dashboard-meteorologico-interactivo-0rzh.onrender.com';

// Agregamos un evento que se activa cuando el usuario hace click en el botón buscar
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) return;

  // Usamos la URL dinámica del backend
  fetch(`${backendUrl}/weather?city=${encodeURIComponent(city)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ciudad no encontrada o error en la consulta.');
      }
      return response.json();
    })
    .then(data => {
      cityName.textContent = data.name + ', ' + data.sys.country;
      temperature.textContent = Math.round(data.main.temp);
      description.textContent = data.weather[0].description;
      humidity.textContent = data.main.humidity;
      windSpeed.textContent = data.wind.speed;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherResult.classList.remove('hidden');
      errorMessage.classList.add('hidden');
    })
    .catch(err => {
      weatherResult.classList.add('hidden');
      errorMessage.textContent = err.message;
      errorMessage.classList.remove('hidden');
    });
});




