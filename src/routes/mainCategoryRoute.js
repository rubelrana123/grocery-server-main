const {
  createMainCategory,
  getAllMainCategories,
  updateMainCategory,
  deleteMainCategory,
} = require("../controllers/mainCategoryController");
const upload = require("../middlewares/uploadFileMiddleware");
const {
  createMainCategorySchema,
  updateMainCategorySchema,
} = require("../schema/mainCategorySchema");
const validateRequest = require("../utils/zodValidation");

const mainCategoryRouter = require("express").Router();

mainCategoryRouter.post(
  "/create",
  upload.single("mainCategory"),
  validateRequest(createMainCategorySchema),
  createMainCategory
);
mainCategoryRouter.get("/all", getAllMainCategories);
mainCategoryRouter.patch(
  "/update/:id",
  upload.single("mainCategory"),
  validateRequest(updateMainCategorySchema),
  updateMainCategory
);
mainCategoryRouter.delete("/remove/:id", deleteMainCategory);

module.exports = mainCategoryRouter;
