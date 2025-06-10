// Carga las variables de entorno desde un archivo `.env`
require('dotenv').config();

// Importa el framework Express para crear un servidor web
const express = require('express');

// Importa Axios para hacer solicitudes HTTP a otras APIs
const axios = require('axios');

// Importa CORS para permitir solicitudes desde otros orígenes 
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Habilita CORS en la aplicación (permite peticiones desde cualquier origen)
app.use(cors());

// Define el puerto en el que el servidor escuchará
const PORT = 3000;

// Obtiene la clave de la API del clima desde las variables de entorno
const API_KEY = process.env.WEATHER_API_KEY;

// Define una ruta GET llamada '/weather'
app.get('/weather', async (req, res) => {
    // Obtiene el valor del parámetro 'city' desde la URL (ej: /weather?city=Puebla)
    const city = req.query.city;

    // Si no se proporciona una ciudad, responde con error 400
    if (!city) return res.status(400).json({ error: 'Ciudad requerida' });

    try {
        // Hace una solicitud a la API de OpenWeatherMap con la ciudad proporcionada
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            }
        );

        // Responde al cliente con los datos del clima obtenidos
        res.json(response.data);
    } catch (error) {
        // Si algo falla al obtener el clima, responde con error 500
        res.status(500).json({ error: 'No se pudo obtener el clima' });
    }
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

