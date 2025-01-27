const express = require("express");
const router = express.Router();
const auth = require('../middleware/authen_author')


const CategoryController = require("../controller/categoryController");

router.get("/", CategoryController.getAllCategory);
router.post("/",  auth.isAdmin ,CategoryController.addNewCategory);
router.delete("/:Id", auth.isAdmin , CategoryController.deleteCategory);


router.post("/:Id",  auth.isAdmin ,CategoryController.postCategory);

module.exports = router;
