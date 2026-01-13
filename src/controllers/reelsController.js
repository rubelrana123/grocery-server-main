const {
  createReelsDB,
  getAllReelsDB,
  deleteReelsDB,
} = require("../services/reelsService");

const createReels = async (req, res) => {
  try {
    const url = req?.file?.path;

    if (!url) {
      return res.json({
        message: "Video url is required.",
        success: false,
      });
    }
    const data = {
      url: url,
    };
    const result = await createReelsDB(data);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Reels is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllReels = async (req, res) => {
  try {
    const result = await getAllReelsDB();

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

const deleteReels = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteReelsDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Reels is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  createReels,
  getAllReels,
  deleteReels,
};
