const { Router } = require('express');
const {Country, Activity} = require('../db.js');
const { fillDB } = require('../dbLoad/fillDB')
const {Op} = require('sequelize')


const router = Router();

//GET /countries y GET /countries?name='...'
router.get('/', async (req, res)=> {

    const {name} = req.query;

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
            attributes: ['id','name','difficulty','duration','season'],
            through: { attributes: [] },
    }})
        if(!nameSearch.length) return res.status(404).send(`El nombre '${name}' no arrojo ningun resultado`)
            res.json(nameSearch)
    } catch (error) {
        console.log(error)
    }
});  

//GET /countries/{idPais}:
router.get('/:id', async (req, res)=>{

    let {id} = req.params;

    try {
        const idSearch = await Country.findOne({
            where:{
                id: id.toUpperCase(),
            },
            include:{
                model: Activity,
                attributes: ['id','name','difficulty','duration','season'],
                through: { attributes: [] },
            }
        })
        
        if(!idSearch) res.status(404).send(`El código '${id}' no corresponde a un pais existente`)
            res.json(idSearch)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;