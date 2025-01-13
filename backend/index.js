const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const Data = require("./config/Database");
const ProductRouter = require("./router/productRouter");
const UserRouter = require("./router/userRouter");
const OrderRouter = require("./router/orderRouter");
const CategorRouter = require("./router/categoryRouter");
const SubCategorRouter = require("./router/SubCatRouter");
const CartRouter = require("./router/cartRouter");
const WishListRouter = require("./router/wishlistRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "http://localhost:4200" }));
app.use("/uploads" , express.static("./uploads"))

app.use("/uploads", express.static("./uploads"));
app.use("/products", ProductRouter);
app.use("/users", UserRouter);
app.use("/orders", OrderRouter);
app.use("/category", CategorRouter);
app.use("/subCategory", SubCategorRouter);
app.use("/cart", CartRouter);
app.use("/wishlist", WishListRouter);

const port = process.env.Port;

app.listen(port, () => console.log(`app listen succesfully on port ${port}`));
