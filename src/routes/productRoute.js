const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsForTable,
  getProductsForOffer,
} = require("../controllers/productController");
const upload = require("../middlewares/uploadFileMiddleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../schema/productSchema");
const validateRequest = require("../utils/zodValidation");

const productRouter = require("express").Router();

productRouter.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnailImage", maxCount: 1 },
  ]),
  validateRequest(createProductSchema),
  createProduct
);
productRouter.get("/all", getAllProducts);
productRouter.patch(
  "/update/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnailImage", maxCount: 1 },
  ]),
  validateRequest(updateProductSchema),
  updateProduct
);
productRouter.delete("/remove/:id", deleteProduct);
productRouter.get("/table", getProductsForTable);
productRouter.get("/offer", getProductsForOffer);

module.exports = productRouter;
