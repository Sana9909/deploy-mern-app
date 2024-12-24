const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
// This is the schema for the user
// The schema is used to define the structure of the user
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create model
// This is the model for the user
// The model is used to interact with the database
// The model is used to create, read, update, and delete users
// Here, "users" is the collection name which is used to store the users
const UserModel=mongoose.model("users",UserSchema);

module.exports=UserModel;