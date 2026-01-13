const DB = require("../configs/dbConfig");

const getOneStoryByTitleDB = async (title) => {
  try {
    const res = await DB.story.findUnique({
      where: {
        title: title,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllStoriesDB = async () => {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const result = await DB.story.findMany({
      where: {
        createdAt: {
          gte: twentyFourHoursAgo,
        },
      },
      select: {
        id: true,
        title: true,
        url: true,
        product: {
          select: {
            id: true,
            title: true,
            discountPrice: true,
            thumbnailImage: true,
            weight: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createStoryDB = async (data) => {
  try {
    const res = await DB.story.create({
      data: data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateStoryDB = async (id, updatedData) => {
  try {
    const data = await DB.story.update({
      where: {
        id: id,
      },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteStoryDB = async (id) => {
  try {
    const res = await DB.story.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOneStoryByTitleDB,
  createStoryDB,
  getAllStoriesDB,
  updateStoryDB,
  deleteStoryDB,
};
