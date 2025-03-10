import { FaCloudSun } from "react-icons/fa"; // Nublado
import { FaSun } from "react-icons/fa"; // Soleado
import { FaCloudSunRain } from "react-icons/fa"; // Lluvia ligera
import { BsCloudsFill } from "react-icons/bs"; // Muy nublado
import { IoRainySharp } from "react-icons/io5"; // Lluvia
import { IoThunderstorm } from "react-icons/io5"; // Tormenta

// Función para obtener el ícono según la descripción del clima
export const getWeatherIcon = (weatherDescription) => {
    if (!weatherDescription) {
        console.log('No se recibió descripción del clima');
        return <FaSun />; // Valor predeterminado (soleado)
    }

    const description = weatherDescription.toLowerCase();
    console.log('Descripción del clima:', description);

    // Mapeo de las descripciones de clima a los íconos correspondientes
    if (description.includes('despejado')) return <FaSun  className="soleado"/>;  // Cielo claro
    if (description.includes('claro')) return <FaSun  className="soleado"/>;  // Cielo claro
    if (description.includes('muy nuboso')) return <BsCloudsFill className="nuboso"/>;  // Nubes rotas o dispersas
    if (description.includes('nubes')) return <FaCloudSun className="nuboso"/>;  // Nubes dispersas
    if (description.includes('ligera')) return <FaCloudSunRain className="ligera"/>;  // Lluvia
    if (description.includes('lluvia')) return <IoRainySharp  className="lluvia"/>;  // Lluvia
    if (description.includes('tormenta')) return <IoThunderstorm />;  className="tormenta"// Tormenta

    return <FaSun />;  // Valor predeterminado si no se encuentra coincidencia
};

