const { Router } = require('express');
const {Country, Activity} = require('../db.js');


const router = Router();

//GET /countries/{idPais}:
router.get('/:id', async (req, res)=>{
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

module.exports = router;