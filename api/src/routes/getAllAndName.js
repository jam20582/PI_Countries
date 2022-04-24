const { Router } = require('express');
const {Country, Activity} = require('../db.js');
const  {infoApi} = require('../dbLoad/infoApi');
//const {fillDB} = require('../dbLoad/fillDB.js')
const router = Router();

const fillDB = async ()=>{
    try{
        //comprobamos que la db este con datos  
        let checkDb = await Country.findAll()
            // si la db esta vacia vamos a llenarla con los datos de la api
            if(!checkDb.length){
            //nos traemos toda la info de la api
            const countries = await infoApi()
            //inyectamos los datos a la db
            await Country.bulkCreate(countries)             
            }
    } catch (error){
        console.log(error) 
    }
}
//GET /countries y GET /countries?name="..."
router.get('/', async (req, res)=> {
    //si llegase a venir por query tomamos el name
    const {name} = req.query;
    console.log('entre a la ruta')
    console.log(name)

    let options = {} 

    try {
        await fillDB()
        if(name){
            options = {
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`,
                    }
                }
            }
        }
        const nameSearch = await Country.findAll({...options, include: {
            model: Activity,
            attributes: ["id","name","difficulty","duration","season"],
            through: { attributes: [] },
    }})
        if(!nameSearch.length) return res.status(404).send(`El nombre "${name}" no arrojo ningun resultado`)
        //sino devolvemos lo que haya coincidido con la busqueda
        res.json(nameSearch)

    } catch (error) {
        res.json({error: 'no se encontro paises'})
    }
});  

module.exports = router;