const Joi=require("joi");
//joi is a library for validating data based on a schema

const registerValidation=(req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request :((((",error});
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
    });

    //joi validate
    //validate(req.body) returns an object with the following properties: 
    //value: the validated value
    //error: the error object
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request :(((",error});
    }

    //if there is no error then the request is valid 
    //and we can move to the next middleware
    //the next middleware is the controller
    //the controller is the function that handles the request
    //the controller is the function that sends the response
    next();
}
module.exports={
    registerValidation,
    loginValidation
};