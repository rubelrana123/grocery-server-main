const adminRouter = require("./adminRoute");
const authRouter = require("./authRoute");
const categoryRouter = require("./categoryRoute");
const deliveryManRouter = require("./deliveryManRoute");
const mainCategoryRouter = require("./mainCategoryRoute");
const offerRouter = require("./offerRoute");
const orderRouter = require("./orderRoute");
const productRouter = require("./productRoute");
const reelsRouter = require("./reelsRoute");
const storyRouter = require("./storyRoute");
const subCategoryRouter = require("./subCategoryRoute");
const userRouter = require("./userRoute");

const router = require("express").Router();

router.use("/mainCategory", mainCategoryRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/product", productRouter);
router.use("/story", storyRouter);
router.use("/reels", reelsRouter);
router.use("/offer", offerRouter);
router.use("/order", orderRouter);
router.use("/deliveryMan", deliveryManRouter);

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);

module.exports = router;
