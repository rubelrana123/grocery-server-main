const {
  createStory,
  getAllStories,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");
const upload = require("../middlewares/uploadFileMiddleware");
const {
  createStorySchema,
  updateStorySchema,
} = require("../schema/storySchema");
const validateRequest = require("../utils/zodValidation");

const storyRouter = require("express").Router();

storyRouter.post(
  "/create",
  upload.single("storyImage"),
  validateRequest(createStorySchema),
  createStory
);
storyRouter.get("/all", getAllStories);
storyRouter.patch(
  "/update/:id",
  upload.single("storyImage"),
  validateRequest(updateStorySchema),
  updateStory
);
storyRouter.delete("/remove/:id", deleteStory);

module.exports = storyRouter;
