const DB = require("../configs/dbConfig");

const getOneSubCategoryByTitleDB = async (title) => {
  try {
    const res = await DB.subCategory.findUnique({ where: { title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllSubCategoriesDB = async () => {
  try {
    const res = await DB.subCategory.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createSubCategoryDB = async (data) => {
  try {
    const res = await DB.subCategory.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateSubCategoryDB = async (id, updatedData) => {
  try {
    const data = await DB.subCategory.update({
      where: { id },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteSubCategoryDB = async (id) => {
  try {
    const res = await DB.subCategory.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getSubCategoriesByMainAndCategoryIdDB = async (data) => {
  const { mainCategoryId, categoryId } = data;
  try {
    const res = await DB.subCategory.findMany({
      where: {
        AND: [
          categoryId && { categoryId: categoryId },
          mainCategoryId && {
            category: {
              mainCategoryId: mainCategoryId,
            },
          },
        ].filter(Boolean),
      },
      select: {
        id: true,
        title: true,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOneSubCategoryByTitleDB,
  createSubCategoryDB,
  getAllSubCategoriesDB,
  updateSubCategoryDB,
  deleteSubCategoryDB,
  getSubCategoriesByMainAndCategoryIdDB,
};
