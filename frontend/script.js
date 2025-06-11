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

// Agregamos un evento que se activa cuando el usuario hace click en el botón buscar
searchBtn.addEventListener('click', () => {
  // Tomamos el valor que escribió el usuario en el input y eliminamos espacios en blanco
  const city = cityInput.value.trim();
  // Si no escribió nada, no hacemos nada
  if (!city) return;

  // Hacemos una petición HTTP GET a nuestro backend 
  fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`)
  fetch(`https://mini-dashboard-meteorologico-interactivo-0rzh.onrender.com/weather?city=${encodeURIComponent(city)}`)
    // Aquí se puede cambiar la URL para apuntar a la versión en línea de tu backend
    //.fetch(`https://mi-backend-ejemplo.herokuapp.com/weather?city=${encodeURIComponent(city)}`)

    // Cuando responde la petición
    .then(response => {
      // Si la respuesta no es correcta, lanzamos error
      if (!response.ok) {
        throw new Error('Ciudad no encontrada o error en la consulta.');
      }
      // Si todo bien, extraemos el JSON con los datos
      return response.json();
    })
    // Cuando tenemos los datos
    .then(data => {
      // Actualizamos los elementos de la página con la info recibida
      cityName.textContent = data.name + ', ' + data.sys.country;
      temperature.textContent = Math.round(data.main.temp);
      description.textContent = data.weather[0].description;
      humidity.textContent = data.main.humidity;
      windSpeed.textContent = data.wind.speed;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      // Mostramos la sección con el resultado
      weatherResult.classList.remove('hidden');
      // Ocultamos cualquier mensaje de error
      errorMessage.classList.add('hidden');
    })
    // Si ocurre un error
    .catch(err => {
      // Ocultamos la sección de resultado
      weatherResult.classList.add('hidden');
      // Mostramos el mensaje de error
      errorMessage.textContent = err.message;
      errorMessage.classList.remove('hidden');
    });
});



