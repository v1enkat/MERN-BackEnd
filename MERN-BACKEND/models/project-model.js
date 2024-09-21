const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/Anima")

const projectSchema = mongoose.Schema({
    
    email:String,
    projectname:String,
    para1:String,
    para2:String,
    para3:String,
    image1:Buffer, 
    image2:Buffer
    
    

})  

module.exports = mongoose.model("projects",projectSchema);