const express= require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get("/", (req,res)=>{
    res.render("owner-login")
})
 
router.get("/workassign", (req,res)=>{
    res.render("workassign")
})
   
if(process.env.NODE_ENV==="development"){
    
    router.post("/create",async (req,res)=>{ 
        let {name,password,mail} = req.body;

       let owners= await ownerModel.find();
       
  if(owners.length>0){
    return res
              .send(503)
              .send("you already have an account")
  }

         let ownercreated = await ownerModel.create({
            name,
            mail,
             password
         }) 
     
         res.sendStatus(201).send(ownercreated); 
    })
} 

router.get("/admin", (req,res)=>{
    let sucess = req.flash("sucess")
    res.render("createproducts",{sucess})
})
 

module.exports = router;