const Product = require("../model/productModel");
const SubCategory = require("../model/subCategoryModel");
const Category = require("../model/categoryModel");
const PostData = require("../middleware/PostDataInDB");
const DeleteData = require("../middleware/DeleteFromDB");
const mongoose = require("mongoose");


const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; 

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const totalProducts = await Product.countDocuments();

    const Data = await Product.find()
      .populate("category")
      .populate("subCategory")
      // .skip((pageNumber - 1) * limitNumber) 
      // .limit(limitNumber);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    return res.status(200).json({
      status: "success",
      Data,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalProducts,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).json({ status: "failed", Data: null });
  }
};


const addNewProduct =  async (req, res) => {
    try {


        if (!req.file) {
          return res
            .status(400)
            .json({ status: "failed", message: "No file uploaded" });
        }
        req.body.image = req.file.filename;
        if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
          return res.status(400).json({ status: "failed", message: "Invalid category ID" , "Request body: ": req.body });

        }
    
        if (!mongoose.Types.ObjectId.isValid(req.body.subCategory)) {
          return res.status(400).json({ status: "failed", message: "Invalid subCategory ID" });
        }

        console.log("Request body: ", req.body);

      
        const NewProduct = await Product.create(req.body);
        const populatedProduct = await Product.findById(NewProduct._id)
      .populate('category', 'name') 
      .populate('subCategory', 'name'); 
  
      res.status(201).json({ status: " success", Data: populatedProduct });
    } catch (error) {
      console.log(`error occured while creating new product : ${error}`);
      res
        .status(500)
        .json({
          status: " failed",
          msg: "error occured while creating new product",
          Data: null,
        });
    }
  };
const postProduct = PostData("Product");

const deleteProduct = DeleteData("Product");

const getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { page = 1, limit = 5 } = req.query; // Default page is 1, limit is 5

    const subCategory = await SubCategory.find({ _id: subCategoryId });
    if (!subCategory) {
      return res
        .status(404)
        .json({ status: "failed ", message: "SubCategory not found" });
    }

    const products = await Product.find({ subCategory: subCategoryId })
      .populate("subCategory", "name")
      .skip((page - 1) * limit) // Skip items for pagination
      .limit(Number(limit)); // Limit the number of items per page

    const totalProducts = await Product.countDocuments({
      subCategory: subCategoryId,
    });

    res.status(200).json({
      status: "success",
      subCategoryName: subCategory.name,
      products: products,
      num: totalProducts,
      // pagination: {
      //   total: totalProducts,
      //   page: Number(page),
      //   limit: Number(limit),
      //   totalPages: Math.ceil(totalProducts / limit),
      // },
    });
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const  CategoryId  = Number(req.params.Id);
    const { page = 1, limit = 5 } = req.query; // Default page is 1, limit is 5

    const Category = await SubCategory.find({ id: CategoryId });
    if (!Category) {
      return res
        .status(404)
        .json({ status: "failed ", message: "Category not found" });
    }

    const products = await Product.find({ Category: Category })
      .populate("Category", "name")
      .skip((page - 1) * limit) // Skip items for pagination
      .limit(Number(limit)); // Limit the number of items per page

    const totalProducts = await Product.countDocuments({
      Category: Category,
    });

    res.status(200).json({
      status: "success",
      CategoryName: Category.name,
      products: products,
      num: totalProducts,
      // pagination: {
      //   total: totalProducts,
      //   page: Number(page),
      //   limit: Number(limit),
      //   totalPages: Math.ceil(totalProducts / limit),
      // },
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};



const getProductsByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const category = await Category.findOne({ _id: categoryId });
    const subCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", message: "Category not found" });
    }

    if (!subCategory || subCategory.categoryId.toString() !== categoryId) {
      return res
        .status(404)
        .json({
          status: "failed",
          message: "SubCategory not found or does not belong to the category",
        });
    }

    const products = await Product.find({
      category: categoryId,
      subCategory: subCategoryId,
    })
      .populate("category", "name")
      .populate("subCategory", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments({
      category: categoryId,
      subCategory: subCategoryId,
    });

    res.status(200).json({
      status: "success",
      categoryName: category.name,
      subCategoryName: subCategory.name,
      products: products,
      // pagination: {
      //   total: totalProducts,
      //   page: Number(page),
      //   limit: Number(limit),
      totalPages: Math.ceil(totalProducts / limit),
      // },
    });
  } catch (error) {
    console.error(
      "Error fetching products by category and subcategory:",
      error
    );
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.find({ id: productId })
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product not found" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res
      .status(500)
      .json({ status: "failed ", message: "Internal Server Error" });
  }
};


const filterProducts = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.query;
    const { page = 1, limit = 5 } = req.query; 

    const query = {};
    if (req.query.categoryId) query.category = req.query.categoryId;
    if (req.query.subCategoryId) query.subCategory = req.query.subCategoryId;

    const products = await Product.find(query)
    .populate('category', 'name')
    .populate('subCategory', 'name')
    .skip((page - 1) * limit) 
    .limit(Number(limit)); 

    console.log(query)

    return res.status(200).json({
      status: 'success',
      Data: products,
    });
  } catch (error) {
    console.error('Error filtering products:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};






module.exports = {
  getAllProducts,
  addNewProduct,
  postProduct,
  deleteProduct,
  getProductsBySubCategory,
  getProductsByCategoryAndSubCategory,
  getProductById,
  getProductsByCategory,
  filterProducts,
};
