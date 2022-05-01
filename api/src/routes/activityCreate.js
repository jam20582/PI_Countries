const { Router } = require('express');
const {Country, Activity} = require('../db.js');
const { Op } = require('sequelize');

const router = Router();

//POST /activity
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada ('Summer','Autumn', 'Winter','Spring')

router.post('/', async (req,res)=>{
    const {name, difficulty, duration, season, countryID} = req.body;

    if(!name || !difficulty || !duration || !season || !countryID) res.status(404).send('Faltan datos obligatorios');

    try {
        const activityValidator = await Activity.findOne({
            where: {
                name: name,
            },
            include: [{
                model: Country,
                where: { id: countryID }
            }]     
        }); 
        
        if (activityValidator === null) {
            const [createAct, created] = await Activity.findOrCreate({
                where:{
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    season: season,
                },
            });
            const countriesToAddActivity = await Country.findAll({
                where: {
                    id: {
                        [Op.or]: countryID,
                    }
                },
            });
            await createAct.addCountries(countriesToAddActivity);
            return res.send('Actividad creada');
        } else {
            return res.send('Ya existe la actividad');  
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;