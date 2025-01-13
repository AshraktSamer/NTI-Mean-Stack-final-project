const Order = require("../model/orderModel");

const AllData = require("../middleware/ReadDataFromDB");
const AddData = require("../middleware/AddNewDataToDB");

const getAllOrders = AllData("Order");
const addNewOrder = AddData("Order");

module.exports = {
  getAllOrders,
  addNewOrder,
};
