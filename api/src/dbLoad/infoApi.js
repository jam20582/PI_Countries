const axios = require('axios');

const infoApi = async () => {
    const apiData = await axios('https://restcountries.com/v3/all');

    const countries = await apiData.data.map(c => {
        return{
            name: c.name.common != null ? c.name.common : 'No se encontro nombre',
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