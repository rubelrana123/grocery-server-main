const z = require("zod");

const createStorySchema = z.object({
  body: z.object({
    title: z.string(),
    productId: z.string(),
  }),
});

const updateStorySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    productId: z.string().optional(),
  }),
});

module.exports = {
  createStorySchema,
  updateStorySchema,
};
