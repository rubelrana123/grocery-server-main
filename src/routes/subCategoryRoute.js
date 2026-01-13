const {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByMainAndCategoryId,
} = require("../controllers/subCategoryController");
const {
  createSubCategorySchema,
  updateSubCategorySchema,
} = require("../schema/subCategorySchema");
const validateRequest = require("../utils/zodValidation");

const subCategoryRouter = require("express").Router();

subCategoryRouter.post(
  "/create",
  validateRequest(createSubCategorySchema),
  createSubCategory
);
subCategoryRouter.get("/all", getAllSubCategories);
subCategoryRouter.patch(
  "/update/:id",
  validateRequest(updateSubCategorySchema),
  updateSubCategory
);
subCategoryRouter.delete("/remove/:id", deleteSubCategory);
subCategoryRouter.get(
  "/mainAndCategoryId",
  getSubCategoriesByMainAndCategoryId
);

module.exports = subCategoryRouter;
