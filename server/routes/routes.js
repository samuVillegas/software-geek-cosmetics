const{Router} = require('express');
const router = Router();
const {
    getMain,
    getProducts,
    createSale,
    getSales
}= require('../controller/controller');

router.get('/',getMain);
router.get('/getProducts',getProducts);
router.post('/createSale',createSale);
router.get('/getSales',getSales);

module.exports = router;