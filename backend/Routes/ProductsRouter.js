const router=require('express').Router();
const productsValidation=require('../Middlewares/ProductsValidation');

router.get('/',productsValidation,(req,res)=>{
    console.log("----Logged in user details----");
    console.log(req.user);
    res.status(200).json([
        {
            id:1,
            name:"Product 1"
        },
        {
            id:2,
            name:"Product 2"
        }
    ]);
})

module.exports=router;