const {loginValidation,registerValidation}=require('../Middlewares/AuthValidation');
const {login,register}=require('../Controllers/AuthController');

const router=require('express').Router();

router.post('/register',registerValidation,register);
router.post('/login',loginValidation,login);
// router.get('/homepage');

module.exports=router;