const DB = require("../configs/dbConfig");

const getOneCategoryByTitleDB = async (title) => {
  try {
    const res = await DB.category.findUnique({ where: { title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllCategoriesDB = async () => {
  try {
    const res = await DB.category.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createCategoryDB = async (data) => {
  try {
    const res = await DB.category.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateCategoryDB = async (id, updatedData) => {
  try {
    const data = await DB.category.update({
      where: { id },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteCategoryDB = async (id) => {
  try {
    const res = await DB.category.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getCategoriesByMainCategoryIdDB = async (data) => {
  const { mainCategoryId } = data;
  try {
    const res = await DB.category.findMany({
      where: {
        AND: [mainCategoryId && { mainCategoryId: mainCategoryId }].filter(
          Boolean
        ),
      },
      select: {
        id: true,
        icon: true,
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
  getOneCategoryByTitleDB,
  createCategoryDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
  getCategoriesByMainCategoryIdDB,
};
