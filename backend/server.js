require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'Ciudad requerida' });

    try {
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
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el clima' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
