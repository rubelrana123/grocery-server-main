const DB = require("../configs/dbConfig");

const getOneMainCategoryByTitleDB = async (title) => {
  try {
    const res = await DB.mainCategory.findUnique({ where: { title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllMainCategoriesDB = async () => {
  try {
    const res = await DB.mainCategory.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        icon: true,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createMainCategoryDB = async (data) => {
  try {
    const res = await DB.mainCategory.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateMainCategoryDB = async (id, updatedData) => {
  try {
    const data = await DB.mainCategory.update({
      where: { id },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteMainCategoryDB = async (id) => {
  try {
    const res = await DB.mainCategory.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOneMainCategoryByTitleDB,
  createMainCategoryDB,
  getAllMainCategoriesDB,
  updateMainCategoryDB,
  deleteMainCategoryDB,
};
