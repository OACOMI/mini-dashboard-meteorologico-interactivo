// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importación de módulos necesarios
const express = require('express'); // Framework web
const axios = require('axios');     // Cliente HTTP
const cors = require('cors');       // Habilita CORS

// Inicializa la aplicación de Express
const app = express();

// Habilita CORS para aceptar peticiones desde otros orígenes
app.use(cors());

// Puerto en el que correrá el servidor
const PORT = 3000;

// Clave de API para OpenWeatherMap, obtenida desde el archivo .env
const API_KEY = process.env.WEATHER_API_KEY;

// Ruta GET para consultar el clima de una ciudad
app.get('/weather', async (req, res) => {
    const city = req.query.city; // Obtiene la ciudad de la URL, por ejemplo: /weather?city=Paris

    // Verifica que se haya proporcionado la ciudad
    if (!city) return res.status(400).json({ error: 'Ciudad requerida' });

    try {
        // Hace una solicitud a la API de OpenWeatherMap
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,             // Ciudad a buscar
                    appid: API_KEY,      // API key
                    units: 'metric',     // Unidades en grados Celsius
                    lang: 'es'           // Idioma de la respuesta en español
                }
            }
        );

        // Envía los datos del clima como respuesta JSON
        res.json(response.data);

    } catch (error) {
        // Si ocurre un error al obtener el clima, devuelve un error 500
        res.status(500).json({ error: 'No se pudo obtener el clima' });
    }
});

// Inicia el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
