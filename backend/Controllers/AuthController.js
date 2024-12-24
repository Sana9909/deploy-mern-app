const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//handles the backend operations when we are registering an user
const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:"user already exist",success:false});
        }

        //create a new user in the database
        const userModel=new UserModel({name,email,password});

        //hash the password before saving it in the database
        userModel.password=await bcrypt.hash(password,10);

        //save the user in the database
        await userModel.save();

        //if the user is created successfully, 
        // we will generate the JWT token
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

//handles the backend operations when we are logging an user
const login = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        // MongoDB findOne() method returns only one document that satisfies the criteria entered.
        // If the criteria entered matches for more than one document,
        // the method returns only one document according to natural ordering, 
        // which reflects the order in which the documents are stored in the database.
        const user = await UserModel.findOne({email});
        const errorMsg="Authentication failed email/password not found";

        //If we cannot find the user(user is not registered yet)
        if(!user){
            return res.status(403)
                .json({message:errorMsg,success:false});
        }

        //If we find the user but the password is incorrect
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:errorMsg,success:false});
        }

        //If we find the user and the password is correct, 
        // we will generate the JWT token
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