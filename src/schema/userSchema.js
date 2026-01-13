const z = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    gender: z.string(),
    mobile: z.string(),
    password: z.string().optional(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    gender: z.string().optional(),
    mobile: z.number().optional(),
    password: z.number().optional(),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
