const {
  createProductDB,
  getOneProductByTitleDB,
  getAllProductsDB,
  updateProductDB,
  deleteProductDB,
  getTotalRowsForProductTableDB,
  getProductsForTableDB,
  getProductsForOfferDB,
} = require("../services/productService");
const uploadFileImageKit = require("../utils/uploadFileImageKit");

const createProduct = async (req, res) => {
  try {
    const mainImage = req?.files["thumbnailImage"][0];
    const optionalImages = req?.files["images"] || [];
    const {
      title,
      subCategoryId,
      regularPrice,
      discountPrice,
      description,
      weight,
    } = req.body;

    if (
      !title ||
      !subCategoryId ||
      !regularPrice ||
      !discountPrice ||
      !mainImage
    ) {
      return res.json({
        message:
          "Title, sub category id, regular price, discount price, thumbnail image are required.",
        success: false,
      });
    }
    const product = await getOneProductByTitleDB(title);

    if (product) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const thumbnailImage = await uploadFileImageKit(mainImage);
    const imageData = [];

    if (optionalImages?.length) {
      for (const item of optionalImages) {
        const imageUploadResult = await uploadFileImageKit(item);
        imageData.push({
          url: imageUploadResult.url,
        });
      }
    }
    const productData = {
      title: title,
      subCategoryId: subCategoryId,
      regularPrice: parseInt(regularPrice),
      discountPrice: parseInt(discountPrice),
      description: description,
      weight: weight,
      thumbnailImage: thumbnailImage.url,
      stock: 0,
    };
    const result = await createProductDB(productData, imageData);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      message: "Product is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsDB();

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

const updateProduct = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const file = req?.files["thumbnailImage"] || null;
    const mainImage = file ? file[0] : null;
    const optionalImages = req?.files["images"] || [];
    const {
      title,
      subCategoryId,
      regularPrice,
      discountPrice,
      description,
      stock,
      weight,
    } = req.body;
    if (
      title ||
      mainImage ||
      subCategoryId ||
      regularPrice ||
      discountPrice ||
      description ||
      weight ||
      stock ||
      optionalImages
    ) {
      const thumbnailImage = mainImage
        ? await uploadFileImageKit(mainImage)
        : null;
      const imageData = [];
      if (optionalImages?.length) {
        for (const item of optionalImages) {
          const imageUploadResult = await uploadFileImageKit(item);
          imageData.push({
            url: imageUploadResult.url,
          });
        }
      }
      const productData = {
        title: title,
        subCategoryId: subCategoryId,
        regularPrice: parseInt(regularPrice) || undefined,
        discountPrice: parseInt(discountPrice) || undefined,
        description: description,
        weight: weight,
        stock: parseInt(stock) || undefined,
        thumbnailImage: thumbnailImage?.url,
      };
      const result = await updateProductDB(id, productData, imageData);
      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Product is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteProductDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Product is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getProductsForTable = async (req, res) => {
  try {
    const result = await getProductsForTableDB(req?.query);
    const totalRows = await getTotalRowsForProductTableDB(req.query);

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

const getProductsForOffer = async (req, res) => {
  try {
    const result = await getProductsForOfferDB(req?.query);

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
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsForTable,
  getProductsForOffer,
};
