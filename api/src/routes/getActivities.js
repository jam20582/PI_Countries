const { Router } = require('express');
const {Activity} = require('../db.js');

const router = Router();

router.get('/', (req, res) => {
    Activity.findAll()
        .then((result)=> res.json(result))
        .catch((error) => res.status(404).json('Error con la base de datos de actividades'))
})

module.exports = router;