const { cnn_mysql } = require('../config/db.js')
module.exports = {
    getMain:(req,res)=>{
        res.send('<h1>Hola mundo</h1>');
    }
}