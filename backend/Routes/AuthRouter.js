const {loginValidation,registerValidation}=require('../Middlewares/AuthValidation');
const {login,register}=require('../Controllers/AuthController');

const router=require('express').Router();

// Register and Login
// This is the route for the register and login
// The parameters are validated using the middlewares
// Here the middlewares are loginValidation and registerValidation
// When the user sends a post request to this route, 
// the middleware will validate the request and 
// then the controller will handle the request
router.post('/register',registerValidation,register);
router.post('/login',loginValidation,login);

module.exports=router;