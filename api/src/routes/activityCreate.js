const { Router } = require('express');
const {Country, Activity} = require('../db.js');
const { Op } = require("sequelize");

const router = Router();

//POST /activity
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada ('Summer','Autumn', 'Winter','Spring')

router.post('/', async (req,res)=>{
    //destructuring con los datos que llegan por body
    const {name, difficulty, duration, season, countryID} = req.body;
    //si no esta alguno de los datos mostramos un mensaje de error
    if(!name || !difficulty || !duration || !season || !countryID) res.status(404).send('Faltan datos obligatorios');
    try {
        //validamos que exista la actividad realacionada con el pais
        const activityValidator = await Activity.findOne({
            where: {
                name: name,
            },
            include: [{
                model: Country,
                where: { id: countryID }
            }]     
        }); 
        
        //si no existe la actividad la creamos (findOne devuelve null si no encuentra)
        if (activityValidator === null) {
            const [createAct, created] = await Activity.findOrCreate({
                where:{
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    season: season,
                },
                // defaults: {
                //     name: name,
                //     difficulty: difficulty,
                //     duration: duration,
                //     season: season,  
                // }
            });
            //buscamos el o los paises a los cuales agregar la actividad
            const findCountries = await Country.findAll({
                where: {
                    id: {
                        [Op.or]: countryID,
                    }
                },
            });
            //agregamos la actividad al pais o paises
            const createdActivity = await createAct.addCountries(findCountries);
            return res.send(createdActivity);
        } else {
            return res.send('Ya existe la actividad');  
        }
        
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;