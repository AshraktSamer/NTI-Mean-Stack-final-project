const Category = require("../model/categoryModel");

const AllData = require("../middleware/ReadDataFromDB");
const AddData = require("../middleware/AddNewDataToDB");
const PostData = require("../middleware/PostDataInDB");
const DeleteData = require("../middleware/DeleteFromDB");


const getAllCategory = AllData("Category");
const addNewCategory = AddData("Category");
const postCategory = PostData("Category");
const deleteCategory = DeleteData("Category")

module.exports = {
  getAllCategory,
  addNewCategory,
  postCategory,
  deleteCategory,
};
