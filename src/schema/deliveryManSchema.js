const z = require("zod");

const createDeliveryManSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    type: z.string(),
    zone: z.string(),
    identityType: z.string(),
    identityNumber: z.string(),
    vehicle: z.string(),
    mobile: z.string(),
    password: z.string(),
  }),
});

module.exports = {
  createDeliveryManSchema,
};
