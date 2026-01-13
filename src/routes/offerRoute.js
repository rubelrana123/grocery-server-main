const {
  createOffer,
  updateOffer,
  getAllOffers,
  deleteOffer,
  getOffersForTable,
} = require("../controllers/offerController");

const upload = require("../middlewares/uploadFileMiddleware");
const {
  createOfferSchema,
  updateOfferSchema,
} = require("../schema/offerSchema");
const validateRequest = require("../utils/zodValidation");

const offerRouter = require("express").Router();

offerRouter.post(
  "/create",
  upload.single("bannerImage"),
  validateRequest(createOfferSchema),
  createOffer
);
offerRouter.get("/all", getAllOffers);
offerRouter.patch(
  "/update/:id",
  upload.single("bannerImage"),
  validateRequest(updateOfferSchema),
  updateOffer
);
offerRouter.delete("/remove/:id", deleteOffer);
offerRouter.get("/card", getOffersForTable);
module.exports = offerRouter;
