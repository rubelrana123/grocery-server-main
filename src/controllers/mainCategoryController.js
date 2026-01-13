const {
  createMainCategoryDB,
  getOneMainCategoryByTitleDB,
  getAllMainCategoriesDB,
  updateMainCategoryDB,
  deleteMainCategoryDB,
} = require("../services/mainCategoryService");
const uploadFileImageKit = require("../utils/uploadFileImageKit");

const createMainCategory = async (req, res) => {
  try {
    const file = req?.file;
    const { title } = req.body;

    if (!title || !file) {
      return res.json({
        message: "Title and icon are required.",
        success: false,
      });
    }
    const mainCategory = await getOneMainCategoryByTitleDB(title);

    if (mainCategory) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const imageUploadResult = await uploadFileImageKit(file);
    const data = {
      title: title,
      icon: imageUploadResult?.url,
    };
    const result = await createMainCategoryDB(data);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Main category is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllMainCategories = async (req, res) => {
  try {
    const result = await getAllMainCategoriesDB();

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

const updateMainCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const file = req?.file;
    const { title } = req.body;
    const imageUploadResult = file ? await uploadFileImageKit(file) : null;
    const data = {
      title: title,
      icon: imageUploadResult?.url,
    };

    if (title || data.icon) {
      const result = await updateMainCategoryDB(id, data);

      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Main category is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteMainCategory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteMainCategoryDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Main category is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  createMainCategory,
  getAllMainCategories,
  updateMainCategory,
  deleteMainCategory,
};
