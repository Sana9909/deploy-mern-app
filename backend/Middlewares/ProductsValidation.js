const jwt=require("jsonwebtoken");
const productsValidation=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({message:"Unauthorized, JWT Token is required",success:false});
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(403)
            .json({message:"JWT Token is wrong or expired",success:false});
    }
}

module.exports=productsValidation;
