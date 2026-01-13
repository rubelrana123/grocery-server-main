const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoriesByMainCategoryId,
} = require("../controllers/categoryController");
const upload = require("../middlewares/uploadFileMiddleware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../schema/categorySchema");
const validateRequest = require("../utils/zodValidation");

const categoryRouter = require("express").Router();

categoryRouter.post(
  "/create",
  upload.single("category"),
  validateRequest(createCategorySchema),
  createCategory
);
categoryRouter.get("/all", getAllCategories);
categoryRouter.patch(
  "/update/:id",
  upload.single("category"),
  validateRequest(updateCategorySchema),
  updateCategory
);
categoryRouter.delete("/remove/:id", deleteCategory);
categoryRouter.get("/mainCategoryId", getCategoriesByMainCategoryId);

module.exports = categoryRouter;
