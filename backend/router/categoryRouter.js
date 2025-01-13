const express = require("express");
const router = express.Router();

const CategoryController = require("../controller/categoryController");

router.get("/", CategoryController.getAllCategory);
router.post("/", CategoryController.addNewCategory);
router.delete("/:Id", CategoryController.deleteCategory);


router.post("/:Id", CategoryController.postCategory);

module.exports = router;
