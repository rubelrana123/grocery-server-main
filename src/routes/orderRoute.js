const {
  getOrdersForTable,
  updateOrder,
  getNumberOfOrderForEveryStatus,
  getOneOrderById,
} = require("../controllers/orderController");

const orderRouter = require("express").Router();

orderRouter.get("/table", getOrdersForTable);
orderRouter.patch("/update/:id", updateOrder);
orderRouter.get("/countByStatus", getNumberOfOrderForEveryStatus);
orderRouter.get("/single/:id", getOneOrderById);

module.exports = orderRouter;
