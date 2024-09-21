const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const userModel = require("./models/user-model");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("./models/product-model");
const path = require("path");
const db = require("./configs/mongoose-connection");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const ownerRouter = require("./routes/ownerRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");
const indexRouter = require("./routes/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    expressSession({
    secret: process.env.SESSION_KEY, 
    resave: false,
    saveUninitialized: false,
   
  }));
  app.use(flash()); 

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

  
app.use("/users",userRouter);
app.use("/products",productsRouter); 
app.use("/owner",ownerRouter);
app.use("/", indexRouter);
   
 
app.listen(5000,function(err){
    console.log("Running..........");
}); 
  