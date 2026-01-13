const DB = require("../configs/dbConfig");

const getAllReelsDB = async () => {
  try {
    const res = await DB.reels.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createReelsDB = async (data) => {
  try {
    const res = await DB.reels.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteReelsDB = async (id) => {
  try {
    const res = await DB.reels.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  createReelsDB,
  getAllReelsDB,
  deleteReelsDB,
};
