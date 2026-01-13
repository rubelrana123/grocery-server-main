const z = require("zod");

const createCategorySchema = z.object({
  body: z.object({
    title: z.string(),
    mainCategoryId: z.string(),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    mainCategoryId: z.string().optional(),
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
