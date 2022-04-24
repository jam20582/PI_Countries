// const  {infoApi} = require('./infoApi.js');
// const {Country} = require('../db.js');

// const fillDB = async ()=>{
//     try{
//         //comprobamos que la db este con datos  
//         let checkDb = await Country.findAll()
//             // si la db esta vacia vamos a llenarla con los datos de la api
//             if(!checkDb.length){
//             //nos traemos toda la info de la api
//             const countries = await infoApi()
//             //inyectamos los datos a la db
//             await Country.bulkCreate(countries)             
//             }
//     } catch (error){
//         console.log(error) 
//     }
// }

// module.exports = {fillDB};