const express = require("express");
const isloggedin = require("../middleware/isloggedin");
const router = express.Router();
const userModel = require("../models/user-model");
const multer = require("multer");
const productModel = require("../models/product-model");
const projectModel = require("../models/project-model");
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const mongoose = require("mongoose");

router.get("/",(req,res)=>{
    
    res.render("welcome");
});

 

router.get("/admin",(req,res)=>{
    
  res.render("admincreate");
});

router.get('/home',isloggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("index",{user});
  });

  router.get('/blogs',isloggedin, async(req, res) => {
    const products = await productModel.find({});
    res.render("blogs",{products});
  });
  router.get('/projects',isloggedin, async(req, res) => {
    const products = await projectModel.find({});
    res.render("project",{products});
  });

  router.get('/blogmiddle/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
          return res.status(400).json({ message: "Invalid product ID" });
      }
   
        const bloggg = await productModel.findById(blogId);
        const products = await productModel.find({});
        res.render('blogDetail', { bloggg, products });
    } catch (error) {
        console.error(error); 
        res.status(500).send('Server Error');
    }
});

router.get('/projectmiddle/:id', async (req, res) => {
  try {
      const blogId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
 
      const bloggg = await projectModel.findById(blogId);
      const products = await projectModel.find({});
      res.render('projectdetails', { bloggg, products });
  } catch (error) {
      console.error(error); 
      res.status(500).send('Server Error');
  }
});
 

  router.get('/blogassign',isloggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("createblogs",{user});
  });

  router.get('/pojjcreate',isloggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("createproject",{user});
  });
  
  router.get('/projectassign',isloggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("createblogs",{user});
  });



 
router.get('/workspace',isloggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("blog-workspace",{user});
  });

// router.get("/addtocart/:productid",isloggedin, async (req,res)=>{
//    let user = await userModel.findOne({email: req.user.email});
//    user.cart.push(req.params.productid);
//    await user.save();
   
//     res.redirect("/products/shop");
// });

router.get("/loginn",(req,res)=>{
   
    res.render("login");
});







router.get("/members", isloggedin,async (req,res)=>{
  let users = await userModel.find({}); 
  res.render("members",{users});
});


router.get("/uploadimg",isloggedin,async (req,res)=>{
  let user = await userModel.findOne({email: req.user.email});

  res.render("upload",{user});
});

router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    let { image, details,place,position,batch, branch } = req.body;
      const userId = req.params.id; // Get user ID from the URL
      const user = await userModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

    
      user.image = req.file.buffer; 
      user.details = details; 
      user.place = place;   
      user.position = position; 
      user.branch = branch;
      
      await user.save();
      res.redirect("/workspace")
  } catch (error) {
      console.error("Error details:", error); // Log the error details
      res.status(500).json({ message: "Error uploading image", error });
  }
});  

router.get("/membersdetails",isloggedin,async (req,res)=>{
  let user = await userModel.findOne({email: req.user.email});

  res.render("members-details",{user});
});



router.get('/members/:id', async (req, res) => {
  try {
      const memId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(memId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
      const user = await userModel.findById(memId);
     
      res.render('members-details', {user });
  } catch (error) {
      console.error(error); 
      res.status(500).send('Server Error');
  } 
});

router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product", error });
    }
});   

router.get("/Event",isloggedin,async (req,res)=>{
   res.render("Events")
})

module.exports = router;

