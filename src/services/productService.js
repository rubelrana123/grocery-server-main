const DB = require("../configs/dbConfig");

const getOneProductByTitleDB = async (title) => {
  try {
    const res = await DB.product.findUnique({ where: { title: title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllProductsDB = async () => {
  try {
    const res = await DB.product.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createProductDB = async (productData, imageData) => {
  try {
    const res = await DB.product.create({
      data: {
        ...productData,
        images: {
          createMany: {
            data: imageData,
          },
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateProductDB = async (id, productData, imageData) => {
  try {
    if (imageData?.length) {
      await DB.image.deleteMany({
        where: {
          productId: id,
        },
      });
    }
    const data = await DB.product.update({
      where: {
        id: id,
      },
      data: {
        ...productData,
        images: {
          createMany: {
            data: imageData,
          },
        },
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteProductDB = async (id) => {
  try {
    const images = await DB.image.deleteMany({
      where: {
        productId: id,
      },
    });
    const res = await DB.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getProductsForTableDB = async (data) => {
  try {
    const { mainCategoryId, categoryId, subCategoryId } = data;
    const limit = parseInt(data.limit);
    const offSet = parseInt(limit * (data.page - 1));

    const result = await DB.product.findMany({
      where: {
        AND: [
          subCategoryId && {
            subCategoryId: subCategoryId,
          },
          categoryId && {
            subCategory: {
              categoryId: categoryId,
            },
          },
          mainCategoryId && {
            subCategory: {
              category: {
                mainCategoryId: mainCategoryId,
              },
            },
          },
        ].filter(Boolean),
      },
      take: limit,
      skip: offSet,
      select: {
        id: true,
        title: true,
        regularPrice: true,
        discountPrice: true,
        thumbnailImage: true,
        description: true,
        weight: true,
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
                mainCategory: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
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

const getTotalRowsForProductTableDB = async (data) => {
  try {
    const { mainCategoryId, categoryId, subCategoryId } = data;

    const result = await DB.product.count({
      where: {
        AND: [
          subCategoryId && {
            subCategoryId: subCategoryId,
          },
          categoryId && {
            subCategory: {
              categoryId: categoryId,
            },
          },
          mainCategoryId && {
            subCategory: {
              category: {
                mainCategoryId: mainCategoryId,
              },
            },
          },
        ].filter(Boolean),
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getProductsForOfferDB = async (data) => {
  try {
    const limit = parseInt(data.limit);
    const { search } = data;
    const result = await DB.product.findMany({
      where: {
        AND: [
          search && {
            title: {
              contains: search,
            },
          },
        ].filter(Boolean),
      },
      orderBy: {
        title: "asc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        discountPrice: true,
        weight: true,
        thumbnailImage: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getNumberOfProductDB = async () => {
  try {
    const result = await DB.product.count();
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOneProductByTitleDB,
  createProductDB,
  getAllProductsDB,
  updateProductDB,
  deleteProductDB,
  getProductsForTableDB,
  getTotalRowsForProductTableDB,
  getProductsForOfferDB,
  getNumberOfProductDB,
};
