const { cnn_mysql } = require('../config/db.js')
const info_prueba = require('../../Data/info_prueba.json'); 
module.exports = {
    getMain:(req,res)=>{
        res.send('<h1>Hola mundo</h1>');
    },
    getProducts: (req,res)=>{
        res.send(info_prueba);
    }
}