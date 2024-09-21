const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Anima")

const userSchema = mongoose.Schema({
    picture: String,
    image: Buffer,
    details:String,
    place:String,
    branch:String,
    batch:Number,
    position:String, 
    fullname: String,
    email: String, // Corrected typo here
    password: String,

    work: [
        {
            workname: String,
            workdetails: String,
            deadline: Number,
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            }
        }
    ],
    project: [
        {
            projectname: String,
            projectdetails: String,
            deadline: Number,
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            }
        }
    ],
});

module.exports = mongoose.model("users",userSchema);