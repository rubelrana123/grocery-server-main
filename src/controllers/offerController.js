const {
  createOfferDB,
  getOneOfferByTitleDB,
  getAllOffersDB,
  updateOfferDB,
  deleteOfferDB,
  getOffersForTableDB,
} = require("../services/offerService");
const uploadFileImageKit = require("../utils/uploadFileImageKit");

const createOffer = async (req, res) => {
  try {
    const file = req?.file;
    const { title, startTime, endTime } = req.body;
    const offerItems = JSON.parse(req.body.offerItems);
    if (!title || !file) {
      return res.json({
        message: "Title, and banner are required.",
        success: false,
      });
    }
    const offer = await getOneOfferByTitleDB(title);

    if (offer) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const imageUploadResult = await uploadFileImageKit(file);
    const offerData = {
      title: title,
      banner: imageUploadResult?.url,
      startTime: startTime,
      endTime: endTime,
    };
    const result = await createOfferDB(offerData, offerItems);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Offer is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllOffers = async (req, res) => {
  try {
    const result = await getAllOffersDB();

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

const getOffersForTable = async (req, res) => {
  try {
    const result = await getOffersForTableDB();

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: true });
  }
};

const updateOffer = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const file = req?.file;
    const { title, startTime, endTime } = req.body;
    const offerItems = req.body?.offerItems
      ? JSON.parse(req.body?.offerItems)
      : null;
    const imageUploadResult = file ? await uploadFileImageKit(file) : null;
    const offerData = {
      title: title,
      banner: imageUploadResult?.url,
      startTime: startTime,
      endTime: endTime,
    };

    if (title || offerItems || offerData?.banner || startTime || endTime) {
      const result = await updateOfferDB(id, offerData, offerItems);

      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Offer is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteOfferDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Offer is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  updateOffer,
  deleteOffer,
  getOffersForTable,
};
