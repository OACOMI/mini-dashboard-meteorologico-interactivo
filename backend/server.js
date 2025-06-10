require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Puerto dinámico para plataformas como Render 
const PORT = process.env.PORT || 3000;

// Tu API Key almacenada en variables de entorno (.env o configuración en Render)
const API_KEY = process.env.WEATHER_API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'Ciudad requerida' });

    try {
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el clima' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
