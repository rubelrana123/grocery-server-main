const {
  createReels,
  getAllReels,
  deleteReels,
} = require("../controllers/reelsController");
const upload = require("../middlewares/uploadFileMiddleware");

const reelsRouter = require("express").Router();

reelsRouter.post("/create", upload.single("file"), createReels);
reelsRouter.get("/all", getAllReels);
reelsRouter.delete("/remove/:id", deleteReels);

module.exports = reelsRouter;
