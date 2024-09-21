const express = require("express");
const router = express.Router();
const uploat = require("../configs/multer-config");
const upload = require("../configs/multer-config");
const productModel = require("../models/product-model");
const isloggedin = require("../middleware/isloggedin");
const userModel = require("../models/user-model");
const projectModel = require("../models/project-model");

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { email, workname, workdetails, deadline } = req.body;
      
        const user = await userModel.findOne({ email: email });

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.work.push({ workname, workdetails, deadline });


        await user.save();
 
        res.redirect("/workspace");
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/createproject', upload.single("image"), async (req, res) => {
    try {
        let { email, projectname, projectdetails, deadline } = req.body;
      
        const user = await userModel.findOne({ email: email });

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.project.push({ projectname, projectdetails, deadline });
 

        await user.save();

        res.redirect("/workspace");
    } catch (error) {
        res.send(error.message);
    }
});



router.post('/blogcreate', upload.fields([{ name: "image1" }, { name: "image2" }]), async (req, res) => { // {{ edit_2 }} Changed to upload.fields for specific input names
    try {
        let { blogname, para1, para2, para3 } = req.body;
        let product = await productModel.create({
            blogname,
            para1,
            para2,
            para3,
            image1: req.files['image1'][0].buffer,
            image2: req.files['image2'][0].buffer  
        });
      
        res.redirect("/blogs");
    } catch (error) {
        res.send(error.message);
    }
});
router.post('/projectcreate', upload.fields([{ name: "image1" }, { name: "image2" }]), async (req, res) => { // {{ edit_2 }} Changed to upload.fields for specific input names
    try {
        let { projectname, para1, para2, para3 } = req.body;
        let product = await projectModel.create({
            projectname,
            para1,
            para2,
            para3,
            image1: req.files['image1'][0].buffer,
            image2: req.files['image2'][0].buffer  
        });
      
        res.redirect("/projects");
    } catch (error) {
        res.send(error.message);
    }
}); 


module.exports = router; 