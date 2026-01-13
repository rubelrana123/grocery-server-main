const z = require("zod");

const createMainCategorySchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

const updateMainCategorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

module.exports = {
  createMainCategorySchema,
  updateMainCategorySchema,
};
