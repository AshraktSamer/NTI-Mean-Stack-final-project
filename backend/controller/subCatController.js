  const SubCategory = require("../model/subCategoryModel");
  const mongoose = require('mongoose')

  const AllData = require("../middleware/ReadDataFromDB");
  const AddData = require("../middleware/AddNewDataToDB");
  const PostData = require("../middleware/PostDataInDB");
  const DeleteData = require("../middleware/DeleteFromDB");


  const getAllSubCategory = AllData("SubCategory");
  const addNewSubCategory = AddData("SubCategory");
  const postSubCategory = PostData("SubCategory");
  const deleteSubCategory = DeleteData("SubCategory")



  const getSubCategoriesByCategoryId = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      // Validate categoryId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ status: "error", message: "Invalid category ID" });
      }
  
      // Find subcategories with the given categoryId
      const subcategories = await SubCategory.find({ categoryId }).populate("categoryId", "name");
  
      if (subcategories.length === 0) {
        return res.status(404).json({ status: "error", message: "No subcategories found for this category ID" });
      }
  
      res.status(200).json({
        status: "success",
        Data: subcategories,
      });
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };

  module.exports = {
    getAllSubCategory,
    addNewSubCategory,
    postSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId,
  };
