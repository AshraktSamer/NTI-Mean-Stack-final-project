const express = require("express");
const router = express.Router();
const auth = require('../middleware/authen_author')


const subCategoryController = require("../controller/subCatController");

router.get("/", subCategoryController.getAllSubCategory);
router.post("/",auth.isAdmin , subCategoryController.addNewSubCategory);
router.delete("/:Id",auth.isAdmin , subCategoryController.deleteSubCategory);

router.post("/:Id",auth.isAdmin , subCategoryController.postSubCategory);
router.get("/:categoryId" , auth.isAdmin ,subCategoryController.getSubCategoriesByCategoryId);

module.exports = router;
