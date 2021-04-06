const{Router} = require('express');
const router = Router();
const {
    getMain
}= require('../controller/controller');

router.get('/',getMain);


module.exports = router;