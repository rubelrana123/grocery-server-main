const {
  createStoryDB,
  getOneStoryByTitleDB,
  getAllStoriesDB,
  updateStoryDB,
  deleteStoryDB,
} = require("../services/storyService");

const uploadFileImageKit = require("./../utils/uploadFileImageKit");

const createStory = async (req, res) => {
  try {
    const file = req?.file;
    const { title, productId } = req.body;

    if (!title || !productId || !file) {
      return res.json({
        message: "Title, product id and image are required.",
        success: false,
      });
    }
    const story = await getOneStoryByTitleDB(title);

    if (story) {
      return res.json({
        message: "Title already exists.",
        success: false,
      });
    }
    const imageUploadResult = await uploadFileImageKit(file);
    const data = {
      ...req?.body,
      url: imageUploadResult?.url,
    };
    const result = await createStoryDB(data);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Story is created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getAllStories = async (req, res) => {
  try {
    const result = await getAllStoriesDB();

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

const updateStory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const file = req?.file;
    const { title, productId } = req.body;
    const imageUploadResult = file ? await uploadFileImageKit(file) : null;

    if (title || productId || file) {
      const data = {
        ...req?.body,
        url: imageUploadResult?.url,
      };
      const result = await updateStoryDB(id, data);

      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Story is updated successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const deleteStory = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteStoryDB(id);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "Story is deleted successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  createStory,
  getAllStories,
  updateStory,
  deleteStory,
};
