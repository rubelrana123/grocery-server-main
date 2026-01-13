const z = require("zod");

const createOfferSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

const updateOfferSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

module.exports = {
  createOfferSchema,
  updateOfferSchema,
};
