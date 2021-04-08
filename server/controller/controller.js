const { cnn_mysql } = require('../config/db.js')
const info_prueba = require('../../Data/info_prueba.json'); 
module.exports = {
    getMain:(req,res)=>{
        res.send('<h1>Hola mundo</h1>');
    },
    getProducts: (req,res)=>{
        try{
            res.status(275).json({message:info_prueba}); //Envío al cliente
        }catch(e){
            return res.status(255).json({message:'SERVER_ERROR' });
        }
    },
    saveProducts: (req,res)=>{
        try{
            const result = cnn_mysql.execute('DELETE FROM Product',function(err,rows){
                if(err) return res.status(255).json({message:'SERVER_ERROR' });
                else{
                    var query = 'INSERT INTO Product (Description,Price,Existence) VALUES'
                    const products = Object.values(info_prueba);
                    for(let i = 0; i<products.length; i++){
                        query+=`('${products[i].descripcion}',${products[i].precio},${products[i].existencia}),`;
                    }
                    query = query.slice(0,-1);
                    cnn_mysql.query(query,function(err,rows){
                        if(err) return res.status(255).json({message:'SERVER_ERROR' });
                        else return res.status(265).json({message:'PRODUCTS_STORED_CORRECTLY'});
                    })
                }
            });
        }catch(e){
            return res.status(255).json({message:'SERVER_ERROR' });
        }
    },
    createSale:(req,res)=>{
        try{
            const {NumberSale,SubTotal,TotalIVA,CreationDate,NameUser,Total} = req.body;
            console.log(req.body.NumberSale);

            cnn_mysql.query(`INSERT INTO Sale VALUES(${NumberSale},${SubTotal},${TotalIVA},${CreationDate},'${NameUser}',${Total}); `, function(err,rows){
                if(err)return res.status(255).json({message:err});
                else if(rows) return res.status(265).json({message:'SUCCESSFUL_CREATION_SALE'}); 
            })
        }catch(e){
            return res.status(255).json({message:'SERVER_ERROR'});
        }
    },
    getSales:(req,res)=>{
        try{
            cnn_mysql.query('SELECT * FROM Sale',function(err,rows){
                if(err)return res.status(255).json({message:'SERVER_ERROR'});
                else if(rows.length>0)return res.status(275).json({message:rows});
                else return res.status(285).json({message:'NO_EXIST_SALES'});
            })
        }catch(e){
            return res.status(255).json({message:'SERVER_ERROR'});
        }
    }
}