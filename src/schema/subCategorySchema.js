const z = require("zod");

const createSubCategorySchema = z.object({
  body: z.object({
    title: z.string(),
    categoryId: z.string(),
  }),
});

const updateSubCategorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

module.exports = {
  createSubCategorySchema,
  updateSubCategorySchema,
};
