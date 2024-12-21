const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:"user already exist",success:false});
        }
        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message:"user created successfully",
                success:true
            })
    } catch (error) {
        res.status(500)
            .json({
                message:"something went wrong",
                success:false
            })
    }
}

const login = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg="Authentication failed email/password not found";
        if(!user){
            return res.status(403)
                .json({message:errorMsg,success:false});
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:errorMsg,success:false});
        }
        const jwtToken=jwt.sign({
            email:user.email,
            _id:user._id
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"});

        res.status(200)
            .json({
                message:"Logged in successfully",
                success:true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message:"something went wrong",
                success:false
            })
    }
}

module.exports = { 
    register,
    login
}