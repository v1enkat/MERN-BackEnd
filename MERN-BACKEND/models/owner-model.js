const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Anima")



const ownerSchema = mongoose.Schema({
    name:String,
    mial:String,
    password:String,
    products: {
        type: Array,
        default:[],
    },
    gstin:String,
    picture:String

})


module.exports = mongoose.model("owner",ownerSchema);