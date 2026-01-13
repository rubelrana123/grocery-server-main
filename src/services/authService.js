const DB = require("../configs/dbConfig");

const handleLoginOrRegisterDB = async (data) => {
  try {
    const { mobile, otp } = data;
    const res = await DB.user.upsert({
      where: {
        mobile: mobile,
      },
      update: {
        otp: otp,
      },
      create: {
        mobile: mobile,
        otp: otp,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneUserByMobileDB = async (mobile) => {
  try {
    const user = await DB.user.findUnique({
      where: {
        mobile: mobile,
      },
      select: {
        id: true,
        otp: true,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  handleLoginOrRegisterDB,
  getOneUserByMobileDB,
};
