const z = require("zod");

const createProductSchema = z.object({
  body: z.object({
    title: z.string(),
    subCategoryId: z.string(),
    regularPrice: z.string(),
    discountPrice: z.string(),
    description: z.string().optional(),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subCategoryId: z.string().optional(),
    regularPrice: z.string().optional(),
    discountPrice: z.string().optional(),
    description: z.string().optional(),
    stock: z.string().optional(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
