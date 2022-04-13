const axios = require('axios');

//funcion para realizar la carga de la db
const infoApi = async () => {
    //usamos axios para traernos los datos
    const apiData = await axios('https://restcountries.com/v3/all');

    //mapeamos el resultado obtenido y armamos el objeto que necesitamos
    const countries = await apiData.data.map(c => {
        return{
            name: c.name.official != null ? c.name.official : 'No se encontro nombre',
            id: c.cca3,
            flag: c.flags != null ? c.flags[0] : 'No se encontro bandera',
            region: c.region != null ? c.region : 'No se encontro region',
            capital: c.capital != null ? c.capital[0] : 'No se encontro capital',
            subregion: c.subregion,
            area: c.area,
            population: c.population  
        }
    });
    return countries;
}

module.exports = {infoApi};