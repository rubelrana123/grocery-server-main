const { getNumberOfOrderDB } = require("../services/orderService");
const { getNumberOfProductDB } = require("../services/productService");
const {
  getSidebarDataDB,
  getProductByMainCategoryIdDB,
  getProductBySubCategoryIdDB,
  getProductByCategoryIdDB,
  getSearchedProductDB,
  getProductByProductIdDB,
  createOrderDB,
  getTitleBySubCategoryIdDB,
  getTitleByCategoryIdDB,
  getSubCategoriesByCategoryIdDB,
  getCategoriesByMainCategoryIdDB,
  getSubCategoryIdByTitleDB,
  getCategoryIdByTitleDB,
  getProductIdByTitleDB,
  getAllValidStoriesDB,
  createOrUpdateWishListDB,
  removeOneProductFromWishListDB,
  updateUserDB,
  getUserByUserIdDB,
  getWishListByUserIdDB,
  getOrderByUserIdDB,
  getOfferByIdDB,
  getOfferIdByTitleDB,
  getUsersForTableDB,
  getTotalRowsForUserTableDB,
  getNumberOfUserDB,
} = require("../services/userService");

const getSidebarData = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getSidebarDataDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductByMainCategoryId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getProductByMainCategoryIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductByCategoryId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getProductByCategoryIdDB(id);
    const title = await getTitleByCategoryIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      title: title.title,
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductBySubCategoryId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getProductBySubCategoryIdDB(id);
    const title = await getTitleBySubCategoryIdDB(id);
    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      title: title.title,
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getSearchedProduct = async (req, res) => {
  try {
    const search = req?.query?.search;
    const result = search ? await getSearchedProductDB(search) : [];

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductByProductId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getProductByProductIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      totalAmount,
      orderStatus,
      orderItems,
      deliveryAddress,
      deliveryDate,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;
    const orderData = {
      userId: userId,
      totalAmount: totalAmount,
      orderStatus: orderStatus,
      deliveryAddress: deliveryAddress,
      deliveryDate: deliveryDate,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
      transactionId: transactionId,
    };
    const result = await createOrderDB(orderData, orderItems);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Order is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getSubCategoriesByCategoryIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getCategoriesByMainCategoryId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getCategoriesByMainCategoryIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getCategoryIdByTitle = async (req, res) => {
  try {
    const title = req?.params?.title;
    const result = await getCategoryIdByTitleDB(title);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getSubCategoryIdByTitle = async (req, res) => {
  try {
    const title = req?.params?.title;
    const result = await getSubCategoryIdByTitleDB(title);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductIdByTitle = async (req, res) => {
  try {
    const title = req?.params?.title;
    const result = await getProductIdByTitleDB(title);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllValidStories = async (req, res) => {
  try {
    const result = await getAllValidStoriesDB();

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const createOrUpdateWishList = async (req, res) => {
  try {
    const { userId, productId, date } = req.body;

    if (!userId || !productId || !date) {
      return res.json({
        message: "User id, product id and date are required.",
        success: false,
      });
    }
    const result = await createOrUpdateWishListDB(req.body);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      message: "Product is added to wish list successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const removeOneProductFromWishList = async (req, res) => {
  try {
    const { userId, productId } = req?.query;

    if (!userId || !productId) {
      return res.json({
        message: "User id and product id are required.",
        success: false,
      });
    }
    const result = await removeOneProductFromWishListDB(req.query);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      message: "Product is removed form wish list successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getWishListByUserId = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.json({
        message: "User id is required.",
        success: false,
      });
    }
    const result = await getWishListByUserIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.json({
        message: "User id is required.",
        success: false,
      });
    }
    const { name, gender, email, addressLine, city, remarks } = req?.body;

    if (name || gender || email || addressLine || city || remarks) {
      const data = {
        name: name,
        gender: gender,
        email: email,
        addressLine: addressLine,
        city: city,
        remarks: remarks,
      };
      const result = await updateUserDB(id, data);

      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "User is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.json({
        message: "User id is required.",
        success: false,
      });
    }
    const result = await getUserByUserIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.json({
        message: "User id is required.",
        success: false,
      });
    }
    const result = await getOrderByUserIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getOfferById = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.json({
        message: "User id is required.",
        success: false,
      });
    }
    const result = await getOfferByIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getOfferIdByTitle = async (req, res) => {
  try {
    const title = req?.params?.title;
    const result = await getOfferIdByTitleDB(title);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getUsersForTable = async (req, res) => {
  try {
    const result = await getUsersForTableDB(req?.query);
    const totalRows = await getTotalRowsForUserTableDB();

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      totalRows,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getNumberOfOrderProductUser = async (req, res) => {
  try {
    const product = await getNumberOfProductDB();
    const order = await getNumberOfOrderDB();
    const user = await getNumberOfUserDB();

    res.json({
      product: product,
      order: order,
      user: user,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  getSidebarData,
  getProductByMainCategoryId,
  getProductByCategoryId,
  getProductBySubCategoryId,
  getSearchedProduct,
  getProductByProductId,
  createOrder,
  getSubCategoriesByCategoryId,
  getCategoriesByMainCategoryId,
  getCategoryIdByTitle,
  getSubCategoryIdByTitle,
  getProductIdByTitle,
  getAllValidStories,
  createOrUpdateWishList,
  removeOneProductFromWishList,
  getWishListByUserId,
  updateUser,
  getUserByUserId,
  getOrderByUserId,
  getOfferById,
  getOfferIdByTitle,
  getUsersForTable,
  getNumberOfOrderProductUser,
};
