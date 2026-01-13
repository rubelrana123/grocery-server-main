const {
  handleAdminRegister,
  handleAdminLogin,
} = require("../controllers/adminController");

const adminRouter = require("express").Router();

adminRouter.post("/register", handleAdminRegister);
adminRouter.post("/login", handleAdminLogin);

module.exports = adminRouter;
