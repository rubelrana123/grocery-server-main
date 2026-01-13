const DB = require("../configs/dbConfig");

const createDeliveryManDB = async (data) => {
  try {
    const res = await DB.deliveryMan.create({
      data: data,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getAllDeliveryManDB = async () => {
  try {
    const result = await DB.deliveryMan.findMany({
      select: {
        id: true,
        name: true,
        deliveryManImage: true,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getDeliveryManForTableDB = async (data) => {
  try {
    const limit = parseInt(data.limit);
    const offSet = parseInt(limit * (data.page - 1));

    const result = await DB.deliveryMan.findMany({
      take: limit,
      skip: offSet,
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        zone: true,
        identityType: true,
        identityNumber: true,
        vehicle: true,
        mobile: true,
        password: true,
        identityImage: true,
        deliveryManImage: true,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getTotalRowsForDeliveryManTableDB = async () => {
  try {
    const result = await DB.deliveryMan.count();
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteDeliveryManDB = async (id) => {
  try {
    const result = await DB.deliveryMan.delete({
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

const updateDeliveryManDB = async (id, data) => {
  try {
    const result = await DB.deliveryMan.update({
      where: {
        id: id,
      },
      data: data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  createDeliveryManDB,
  getAllDeliveryManDB,
  getDeliveryManForTableDB,
  getTotalRowsForDeliveryManTableDB,
  deleteDeliveryManDB,
  updateDeliveryManDB,
};
