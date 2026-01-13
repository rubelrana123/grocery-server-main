const {
  createCategoryDB,
  getOneCategoryByTitleDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
  getCategoriesByMainCategoryIdDB,
} = require("../services/categoryService");
const uploadFileImageKit = require("../utils/uploadFileImageKit");

const createCategory = async (req, res) => {
  try {
    const file = req?.file;
    const { title, mainCategoryId } = req.body;

    if (!title || !mainCategoryId || !file) {
      return res.json({
        message: "Title, main category id and icon are required.",
        success: false,
      });
    }
    const category = await getOneCategoryByTitleDB(title);

    if (category) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const imageUploadResult = await uploadFileImageKit(file);
    const data = {
      title: title,
      mainCategoryId: mainCategoryId,
      icon: imageUploadResult.url,
    };
    const result = await createCategoryDB(data);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Category is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await getAllCategoriesDB();

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

const updateCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const file = req?.file;
    const { title, mainCategoryId } = req.body;
    const imageUploadResult = file ? await uploadFileImageKit(file) : null;
    const data = {
      title: title,
      mainCategoryId: mainCategoryId,
      icon: imageUploadResult?.url,
    };

    if (title || mainCategoryId || data.icon) {
      const result = await updateCategoryDB(id, data);

      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Category is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteCategoryDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Category is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getCategoriesByMainCategoryId = async (req, res) => {
  try {
    const result = await getCategoriesByMainCategoryIdDB(req?.query);

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
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoriesByMainCategoryId,
};
