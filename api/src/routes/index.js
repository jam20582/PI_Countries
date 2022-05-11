const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getCountries = require('./getCountries');
const activityCreate = require('./activityCreate');
const getActivities = require('./getActivities');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', getCountries)
router.use('/activity', activityCreate)
router.use('/activities', getActivities)


module.exports = router;
