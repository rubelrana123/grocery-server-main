const uploadFileImageKit = require("./../utils/uploadFileImageKit");
const {
  createDeliveryManDB,
  getDeliveryManForTableDB,
  getTotalRowsForDeliveryManTableDB,
  getAllDeliveryManDB,
  deleteDeliveryManDB,
  updateDeliveryManDB,
} = require("../services/deliveryManService");

const createDeliveryMan = async (req, res) => {
  try {
    const identityImage = req?.files["identityImage"][0];
    const deliveryManImage = req?.files["deliveryManImage"][0];
    const indentityImageResult = await uploadFileImageKit(identityImage);
    const deliveryManImageResult = await uploadFileImageKit(deliveryManImage);

    const deliveryManData = {
      ...req.body,
      identityImage: indentityImageResult?.url,
      deliveryManImage: deliveryManImageResult?.url,
    };
    const result = await createDeliveryManDB(deliveryManData);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Delivery man is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllDeliveryMan = async (req, res) => {
  try {
    const result = await getAllDeliveryManDB();

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

const getDeliveryManForTable = async (req, res) => {
  try {
    const result = await getDeliveryManForTableDB(req?.query);
    const totalRows = await getTotalRowsForDeliveryManTableDB();

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

const deleteDeliveryMan = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteDeliveryManDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Delivery man is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const updateDeliveryMan = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const identityImageFile = req?.files["identityImage"];
    const deliveryManImageFile = req?.files["deliveryManImage"];
    const identityImage = identityImageFile ? identityImageFile[0] : null;
    const deliveryManImage = deliveryManImageFile
      ? deliveryManImageFile[0]
      : null;

    const indentityImageResult = identityImage
      ? await uploadFileImageKit(identityImage)
      : null;
    const deliveryManImageResult = deliveryManImage
      ? await uploadFileImageKit(deliveryManImage)
      : null;

    const deliveryManData = {
      ...req.body,
      identityImage: indentityImageResult?.url,
      deliveryManImage: deliveryManImageResult?.url,
    };
    const result = await updateDeliveryManDB(id, deliveryManData);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Delivery man is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  createDeliveryMan,
  getAllDeliveryMan,
  getDeliveryManForTable,
  deleteDeliveryMan,
  updateDeliveryMan,
};
