const DB = require("../configs/dbConfig");

const handleAdminRegisterDB = async (data) => {
  try {
    const res = await DB.admin.create({
      data: data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneAdminByEmailDB = async (email) => {
  try {
    const admin = await DB.admin.findUnique({
      where: {
        email: email,
      },
      select: {
        password: true,
        id: true,
      },
    });
    return admin;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  handleAdminRegisterDB,
  getOneAdminByEmailDB,
};
