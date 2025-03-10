import axios from 'axios';

const BASE_URL = 'https://api.digital.gob.do/v1/territories/provinces';

// Función para obtener provincias por nombre
export const getProvinces = async (provinceName) => {
  try {
    const url = `${BASE_URL}?name=${encodeURIComponent(provinceName)}`;

    console.log(`curl -X 'GET' '${url}' -H 'accept: application/json'`);
    console.log(`Request URL: ${url}`);

    const response = await axios.get(url, {
      headers: { 'accept': 'application/json' }
    });

    console.log('Respuesta de la API:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error al obtener la provincia:', error);
    return [];
  }
};

export const getRegions = async () => {
  try {
    const url = `https://api.digital.gob.do/v1/territories/regions`;
    const response = await axios.get(url, {
      headers: { 'accept': 'application/json' }
    });

    console.log('Regiones:', response.data);
    return response.data.data || [];
  } catch (error) {
    console.error('Error al obtener regiones:', error);
    return [];
  }
};


