const express = require("express");
const router = express.Router();

const subCategoryController = require("../controller/subCatController");

router.get("/", subCategoryController.getAllSubCategory);
router.post("/", subCategoryController.addNewSubCategory);
router.delete("/:Id", subCategoryController.deleteSubCategory);

router.post("/:Id", subCategoryController.postSubCategory);
router.get("/:categoryId" , subCategoryController.getSubCategoriesByCategoryId);

module.exports = router;
