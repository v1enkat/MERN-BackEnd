const express = require('express');
const router = express.Router();
const {registeruser,login,logout} = require("../controllers/registeruser")



router.post('/register', registeruser);
router.post('/login', login);
router.get('/logout', logout);
module.exports = router;

  