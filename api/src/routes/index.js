const { Router } = require('express');
const  {infoApi} = require('../../dbLoad/loadDbFromApi');
const {Country, Activity} = require('../db.js');
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET /countries y GET /countries?name="..."
router.get('/countries', async (req, res)=> {
    //si llegase a venir por query tomamos el name
    const {name} = req.query;

    //si no hay name es porque ingreso a la ruta /countries
    if(!name){
        try{
            //comprobamos que la db este con datos
            let checkDb = await Country.findAll({
                include: {
                        model: Activity,
                        attributes: ["id","name","difficulty","duration","season"],
                        through: { attributes: [] },
                    }
                })
                // si la db esta vacia vamos a llenarla con los datos de la api
                if(!checkDb.length){
                //nos traemos toda la info de la api
                const countries = await infoApi()
                //inyectamos los datos a la db
                await Country.bulkCreate(countries)
                
                return res.json(countries)             
                }
            //devolvemos un mensaje de exito tras la carga de la db 
            res.json(checkDb)
        } catch (error){
            console.log(error) 
        }
    // por el else sabemos que ingresamos a la ruta /countries?name='...'    
    } else {
        try {
            //hacemos una busqueda en la db de todos los nombres que puedan incluir el name de la query
            const nameSearch = await Country.findAll({
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`,
                    }
                }
            })
            //si no arroja resultados mostramos un mensaje de error
            if(!nameSearch.length) return res.status(404).send(`El nombre "${name}" no arrojo ningun resultado`)
            //sino devolvemos lo que haya coincidido con la busqueda
            res.json(nameSearch)
        } catch (error) {
            console.log(error)
        }
    }
});

//GET /countries/{idPais}:
router.get('/countries/:id', async (req, res)=>{
    //tomamos el id que viene por params
    let {id} = req.params;
    try {
        //buscamos el pais con la id solicitada
        const idSearch = await Country.findOne({
            where:{
                id: id.toUpperCase(),
            },
            include:{
                model: Activity,
                attributes: ["id","name","difficulty","duration","season"],
                through: { attributes: [] },
            }
        })
        //si no encontramos el pais mostramos un mensaje de error
        if(!idSearch) res.status(404).send(`El código "${id}" no corresponde a un pais existente`)
        //sino devolvemos el pais encontrado
        res.json(idSearch)
    } catch (error) {
        console.log(error)
    }
});

//POST /activity
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada ('Summer','Autumn', 'Winter','Spring')

router.post('/activity', async (req,res)=>{
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
