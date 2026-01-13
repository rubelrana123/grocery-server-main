const {
  createDeliveryMan,
  getDeliveryManForTable,
  getAllDeliveryMan,
  deleteDeliveryMan,
  updateDeliveryMan,
} = require("../controllers/deliveryManController");

const upload = require("../middlewares/uploadFileMiddleware");
const { createDeliveryManSchema } = require("../schema/deliveryManSchema");
const validateRequest = require("../utils/zodValidation");

const deliveryManRouter = require("express").Router();

deliveryManRouter.post(
  "/create",
  upload.fields([
    { name: "identityImage", maxCount: 1 },
    { name: "deliveryManImage", maxCount: 1 },
  ]),
  validateRequest(createDeliveryManSchema),
  createDeliveryMan
);

deliveryManRouter.get("/all", getAllDeliveryMan);
deliveryManRouter.get("/table", getDeliveryManForTable);
deliveryManRouter.delete("/remove/:id", deleteDeliveryMan);
deliveryManRouter.patch(
  "/update/:id",
  upload.fields([
    { name: "identityImage", maxCount: 1 },
    { name: "deliveryManImage", maxCount: 1 },
  ]),
  updateDeliveryMan
);

module.exports = deliveryManRouter;
