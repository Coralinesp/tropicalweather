import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import SearchBar from '../Components/SearchBar.jsx';
import { getProvinces, getRegions } from '../Weather/territoriesAPI.js';
import { fetchWeatherForAllProvinces } from '../Weather/WeatherAPI.js'; // Importamos la nueva función
import { getWeatherIcon } from '../Components/Iconsweather.jsx';

function Home() {
    const [provinces, setProvinces] = useState([]);
    const [allProvinces, setAllProvinces] = useState([]);
    const [regionMap, setRegionMap] = useState({}); // Mapa de código de región a nombre
    const [weatherDataMap, setWeatherDataMap] = useState({}); // Mapa de provincia -> clima

    useEffect(() => {
        const fetchData = async () => {
          try {
            const regionsData = await getRegions();
            const regionMapping = {};
            
            // Crear un mapa { regionCode: regionName }
            regionsData.forEach(region => {
              regionMapping[region.identifier] = region.name;
            });
    
            setRegionMap(regionMapping);
          } catch (error) {
            console.error('Error al obtener regiones:', error);
          }
        };
    
        fetchData();
      }, []);


    useEffect(() => {
        const fetchProvinces = async () => {
          try {
            const data = await getProvinces('');
            const provincesWithRegions = data.data.map(province => ({
              ...province,
              regionName: regionMap[province.regionCode] || 'Desconocida'
            }));
    
            setAllProvinces(provincesWithRegions);
            setProvinces(provincesWithRegions);

            // Después de cargar las provincias, obtener el clima de cada una
            await fetchWeatherForAllProvinces(provincesWithRegions, setWeatherDataMap);
          } catch (error) {
            console.error('Error al obtener provincias:', error);
          }
        };
    
        if (Object.keys(regionMap).length > 0) {
          fetchProvinces();
        }
      }, [regionMap]);

    const handleSearch = (provinceName) => {
        const filteredProvinces = allProvinces.filter(province =>
            province.name.toLowerCase().startsWith(provinceName.toLowerCase().trim()) 
        );
        setProvinces(filteredProvinces);
    };

    return (
        <div className='main-home'>
            <h1 className='Titulo'>Clima en República Dominicana</h1>
            <p>Información meteorológica actualizada para todas las provincias</p>
            <SearchBar onSearch={handleSearch} />

            {/* Contenedor para mostrar los resultados de provincias */}
            <div className='contenido-provincias'>

                {provinces.length > 0 ? (
                    provinces.map((province, index) => (

                        <div key={index} className='provincia-card'>
                            <div className='card-top'>
                                <h3>{province.name}</h3>
                                <div className='region'>
                                    <p>{province.regionName}</p>
                                </div>
                            </div>

                            {weatherDataMap[province.name] ? (
                                <div className="weather-info">
                                    <div className='clima-top'>
                                        <h2 className='Temperatura'><b>{weatherDataMap[province.name].main.temp}°C</b></h2>
                                       <div className="weather-icon">
                                            {getWeatherIcon(weatherDataMap[province.name].weather[0].description)}
                                        </div>
                                    </div>
                                    
                                    <p><b>{weatherDataMap[province.name].weather[0].description.charAt(0).toUpperCase()+ weatherDataMap[province.name].weather[0].description.slice(1) }</b></p>
                                    <div className='datos-clima'>
                                        <p>Humedad: </p>
                                        <p>{weatherDataMap[province.name].main.humidity}%</p>
                                    </div>
                                    <div className='datos-clima'>
                                        <p>UV: </p>
                                        <p>{weatherDataMap[province.name].uvIndex}</p>
                                    </div>
                                   
                                </div>) : (
                                <p>Cargando clima...</p>)}
                        </div>
                        ))
                ) : (
                    <p>No hay provincias disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
