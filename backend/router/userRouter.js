const express = require("express");
const router = express.Router();
const auth = require('../middleware/accessControl')

const userController = require("../controller/userController");

router.get('/', auth.isAdmin ,userController.getAllUsers );
router.post('/login', userController.login );
router.post('/register', userController.register );



module.exports = router;
