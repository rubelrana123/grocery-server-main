const {
  createSubCategoryDB,
  getOneSubCategoryByTitleDB,
  getAllSubCategoriesDB,
  updateSubCategoryDB,
  deleteSubCategoryDB,
  getSubCategoriesByMainAndCategoryIdDB,
} = require("../services/subCategoryService");

const createSubCategory = async (req, res) => {
  try {
    const { title, categoryId } = req.body;

    if (!title || !categoryId) {
      return res.json({
        message: "Title and category id are required.",
        success: false,
      });
    }
    const subCategory = await getOneSubCategoryByTitleDB(title);

    if (subCategory) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const result = await createSubCategoryDB(req.body);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Sub category is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const result = await getAllSubCategoriesDB();

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

const updateSubCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const { title, categoryId } = req.body;

    if (title || categoryId) {
      const result = await updateSubCategoryDB(id, req.body);
      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Sub category is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteSubCategoryDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Sub category is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getSubCategoriesByMainAndCategoryId = async (req, res) => {
  try {
    const result = await getSubCategoriesByMainAndCategoryIdDB(req?.query);

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

module.exports = {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByMainAndCategoryId,
};
