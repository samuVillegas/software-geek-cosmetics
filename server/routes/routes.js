const{Router} = require('express');
const router = Router();
const {
    getMain,
    getProducts
}= require('../controller/controller');

router.get('/',getMain);
router.get('/getProducts',getProducts);

module.exports = router;