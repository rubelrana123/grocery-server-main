const DB = require("../configs/dbConfig");

const getSidebarDataDB = async (id) => {
  try {
    const result = await DB.category.findMany({
      where: {
        mainCategoryId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        icon: true,
        subCategories: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getProductByMainCategoryIdDB = async (id) => {
  try {
    const result = await DB.category.findMany({
      where: {
        mainCategoryId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        icon: true,
        subCategories: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            title: true,
            products: {
              orderBy: {
                createdAt: "desc",
              },
              take: 10,
              select: {
                id: true,
                title: true,
                regularPrice: true,
                discountPrice: true,
                thumbnailImage: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTitleByCategoryIdDB = async (id) => {
  try {
    const result = await DB.category.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getProductByCategoryIdDB = async (id) => {
  try {
    const result = await DB.product.findMany({
      where: {
        subCategory: {
          categoryId: id,
        },
      },
      select: {
        id: true,
        title: true,
        regularPrice: true,
        discountPrice: true,
        thumbnailImage: true,
        weight: true,
        subCategory: {
          select: {
            title: true,
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTitleBySubCategoryIdDB = async (id) => {
  try {
    const result = await DB.subCategory.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getProductBySubCategoryIdDB = async (id) => {
  try {
    const result = await DB.product.findMany({
      where: {
        subCategoryId: id,
      },
      select: {
        id: true,
        title: true,
        regularPrice: true,
        discountPrice: true,
        thumbnailImage: true,
        weight: true,
        subCategory: {
          select: {
            title: true,
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getSearchedProductDB = async (search) => {
  try {
    const result = await DB.product.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      select: {
        id: true,
        title: true,
        regularPrice: true,
        discountPrice: true,
        thumbnailImage: true,
        weight: true,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getProductByProductIdDB = async (id) => {
  try {
    const result = await DB.product.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        regularPrice: true,
        discountPrice: true,
        thumbnailImage: true,
        weight: true,
        description: true,
        stock: true,
        images: {
          select: {
            url: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            title: true,
            category: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const createOrderDB = async (orderData, orderItemData) => {
  try {
    const res = await DB.order.create({
      data: {
        userId: orderData.userId,
        orderStatus: orderData.orderStatus,
        totalAmount: orderData.totalAmount,
        deliveryAddress: orderData.deliveryAddress,
        deliveryDate: orderData.deliveryDate,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        transactionId: orderData.transactionId,
        orderItems: {
          createMany: {
            data: orderItemData,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getSubCategoriesByCategoryIdDB = async (id) => {
  try {
    const result = await DB.category.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        subCategories: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getCategoriesByMainCategoryIdDB = async (id) => {
  try {
    const result = await DB.category.findMany({
      where: {
        mainCategoryId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getCategoryIdByTitleDB = async (title) => {
  try {
    const result = await DB.category.findUnique({
      where: {
        title: title,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getSubCategoryIdByTitleDB = async (title) => {
  try {
    const result = await DB.subCategory.findUnique({
      where: {
        title: title,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getProductIdByTitleDB = async (title) => {
  try {
    const result = await DB.product.findUnique({
      where: {
        title: title,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllValidStoriesDB = async () => {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const result = await DB.story.findMany({
      where: {
        createdAt: {
          gte: twentyFourHoursAgo,
        },
      },
      select: {
        id: true,
        title: true,
        url: true,
        product: {
          select: {
            id: true,
            title: true,
            regularPrice: true,
            discountPrice: true,
            thumbnailImage: true,
            weight: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const removeExpiredStoriesDB = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await DB.story.deleteMany({
      where: {
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createOrUpdateWishListDB = async (data) => {
  try {
    const { userId, productId, date } = data;
    const result = await DB.wishList.upsert({
      where: {
        userId: userId,
      },
      update: {
        wishListItems: {
          create: {
            productId: productId,
            date: date,
          },
        },
      },
      create: {
        userId: userId,
        wishListItems: {
          create: {
            productId: productId,
            date: date,
          },
        },
      },
      include: {
        wishListItems: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const removeOneProductFromWishListDB = async (data) => {
  try {
    const { userId, productId } = data;
    const result = await DB.wishListItem.deleteMany({
      where: {
        AND: [
          {
            product: {
              id: productId,
            },
          },
          {
            wishList: {
              userId: userId,
            },
          },
        ],
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getWishListByUserIdDB = async (id) => {
  try {
    const result = await DB.wishListItem.findMany({
      where: {
        wishList: {
          userId: id,
        },
      },
      select: {
        date: true,
        product: {
          select: {
            id: true,
            title: true,
            regularPrice: true,
            discountPrice: true,
            thumbnailImage: true,
            weight: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateUserDB = async (id, updatedData) => {
  try {
    const result = await DB.user.update({
      where: {
        id: id,
      },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUserByUserIdDB = async (id) => {
  try {
    const result = DB.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        mobile: true,
        name: true,
        gender: true,
        email: true,
        addressLine: true,
        city: true,
        remarks: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOrderByUserIdDB = async (id) => {
  try {
    const result = DB.order.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        orderStatus: true,
        totalAmount: true,
        deliveryAddress: true,
        deliveryDate: true,
        paymentMethod: true,
        transactionId: true,
        paymentStatus: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                title: true,
                regularPrice: true,
                discountPrice: true,
                thumbnailImage: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOfferByIdDB = async (id) => {
  try {
    const result = DB.offer.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        banner: true,
        offerItems: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                regularPrice: true,
                discountPrice: true,
                thumbnailImage: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOfferIdByTitleDB = async (title) => {
  try {
    const result = await DB.offer.findUnique({
      where: {
        title: title,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUsersForTableDB = async (data) => {
  try {
    const limit = parseInt(data.limit);
    const offSet = parseInt(limit * (data.page - 1));

    const result = await DB.user.findMany({
      take: limit,
      skip: offSet,
      select: {
        id: true,
        mobile: true,
        name: true,
        gender: true,
        email: true,
        addressLine: true,
        city: true,
        remarks: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getTotalRowsForUserTableDB = async () => {
  try {
    const result = await DB.user.count();
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getNumberOfUserDB = async () => {
  try {
    const result = await DB.user.count();
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const removeExpiredOffersDB = async () => {
  try {
    const currentTime = new Date(Date.now());

    const result = await DB.offer.deleteMany({
      where: {
        endTime: {
          lt: currentTime,
        },
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getSidebarDataDB,
  getProductByMainCategoryIdDB,
  getTitleByCategoryIdDB,
  getProductByCategoryIdDB,
  getTitleBySubCategoryIdDB,
  getProductBySubCategoryIdDB,
  getSearchedProductDB,
  getProductByProductIdDB,
  createOrderDB,
  getSubCategoriesByCategoryIdDB,
  getCategoriesByMainCategoryIdDB,
  getCategoryIdByTitleDB,
  getSubCategoryIdByTitleDB,
  getProductIdByTitleDB,
  getAllValidStoriesDB,
  removeExpiredStoriesDB,
  createOrUpdateWishListDB,
  removeOneProductFromWishListDB,
  getWishListByUserIdDB,
  updateUserDB,
  getUserByUserIdDB,
  getOrderByUserIdDB,
  getOfferByIdDB,
  getOfferIdByTitleDB,
  getUsersForTableDB,
  getTotalRowsForUserTableDB,
  getNumberOfUserDB,
  removeExpiredOffersDB,
};
