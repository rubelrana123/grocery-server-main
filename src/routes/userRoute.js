const {
  getAllMainCategories,
} = require("../controllers/mainCategoryController");
const { getAllOffers } = require("../controllers/offerController");
const { getAllReels } = require("../controllers/reelsController");
const {
  getSidebarData,
  getProductByMainCategoryId,
  getProductByCategoryId,
  getProductBySubCategoryId,
  getSearchedProduct,
  getProductByProductId,
  createOrder,
  getSubCategoriesByCategoryId,
  getCategoryIdByTitle,
  getSubCategoryIdByTitle,
  getProductIdByTitle,
  getAllValidStories,
  createOrUpdateWishList,
  removeOneProductFromWishList,
  updateUser,
  getUserByUserId,
  getWishListByUserId,
  getOrderByUserId,
  getOfferById,
  getOfferIdByTitle,
  getCategoriesByMainCategoryId,
  getUsersForTable,
  getNumberOfOrderProductUser,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/mainCategory/all", getAllMainCategories);
userRouter.get("/sidebar/:id", getSidebarData);
userRouter.get("/product/mainCategory/:id", getProductByMainCategoryId);
userRouter.get("/product/category/:id", getProductByCategoryId);
userRouter.get("/product/subCategory/:id", getProductBySubCategoryId);
userRouter.get("/product/search", getSearchedProduct);
userRouter.get("/product/:id", getProductByProductId);
userRouter.post("/order/create", createOrder);
userRouter.get("/subCategory/category/:id", getSubCategoriesByCategoryId);
userRouter.get("/category/mainCategory/:id", getCategoriesByMainCategoryId);
userRouter.get("/categoryId/:title", getCategoryIdByTitle);
userRouter.get("/subCategoryId/:title", getSubCategoryIdByTitle);
userRouter.get("/productId/:title", getProductIdByTitle);
userRouter.get("/story/all", getAllValidStories);
userRouter.post("/wishList/createOrUpdate", createOrUpdateWishList);
userRouter.delete("/wishList/remove", removeOneProductFromWishList);
userRouter.get("/wishList/user/:id", getWishListByUserId);
userRouter.patch("/user/update/:id", updateUser);
userRouter.get("/user/:id", getUserByUserId);
userRouter.get("/reels/all", getAllReels);
userRouter.get("/order/:id", getOrderByUserId);
userRouter.get("/offer/all", getAllOffers);
userRouter.get("/offer/:id", getOfferById);
userRouter.get("/offerId/:title", getOfferIdByTitle);
userRouter.get("/table", getUsersForTable);
userRouter.get("/orderProductUser/count", getNumberOfOrderProductUser);

module.exports = userRouter;
