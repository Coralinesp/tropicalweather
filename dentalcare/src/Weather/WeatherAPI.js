import axios from 'axios';

// Función para obtener los datos del clima usando el nombre de la ciudad
export const getWeatherByCity = async (cityName) => {
    const apiKey = '009077ab97b20abae545666fadb5493e'; // Tu clave de API de OpenWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`; // lang=es, es para obtener la respuesta en español

   
    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        // Obtener el índice UV usando las coordenadas
        const { lat, lon } = weatherData.coord;
        const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const uvResponse = await axios.get(uvUrl);
        const uvIndex = uvResponse.data.value; // Obtén el índice UV

        // Añadir la humedad y el índice UV a los datos del clima
        weatherData.main.humidity = weatherData.main.humidity; // Humedad
        weatherData.uvIndex = uvIndex; // Índice UV

        return weatherData;
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        return null;
    }
};
// Función para obtener el clima de todas las provincias
export const fetchWeatherForAllProvinces = async (provinces, setWeatherDataMap) => {
    const weatherMap = {};
    for (const province of provinces) {
        try {
            const weather = await getWeatherByCity(province.name);
            weatherMap[province.name] = weather; // Guardamos el clima de cada provincia
        } catch (error) {
            console.error(`Error al obtener clima de ${province.name}:`, error);
            weatherMap[province.name] = null;
        }
    }
    setWeatherDataMap(weatherMap); // Actualizamos el estado con los datos del clima
};