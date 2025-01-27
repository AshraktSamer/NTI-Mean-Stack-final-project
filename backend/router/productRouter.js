const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const auth = require('../middleware/authen_author')


const productController = require("../controller/productController");

router.get('/filter' , productController.filterProducts)


router.get("/", productController.getAllProducts);
router.post("/",auth.isAdmin , upload.single("image"), productController.addNewProduct);

router.delete("/:Id",auth.isAdmin , productController.deleteProduct);

router.post("/:Id",auth.isAdmin , upload.single("image"), productController.postProduct);


router.get("/category/:Id", productController.getProductsByCategory);


router.get("/subcategory/:subCategoryId", productController.getProductsBySubCategory );

router.get("/category/:categoryId/subcategory/:subCategoryId", productController.getProductsByCategoryAndSubCategory);

router.get("/:productId", productController.getProductById );
 

module.exports = router;
