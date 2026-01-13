const {
  handleLoginOrRegisterDB,
  getOneUserByMobileDB,
} = require("../services/authService");

const handleLoginOrRegister = async (req, res) => {
  try {
    const { mobile } = req.body;
    const otp = 1234;
    const data = {
      mobile: mobile,
      otp: otp,
    };
    const result = await handleLoginOrRegisterDB(data);

    if (!result) {
      return res.json({ success: false });
    }
    res.json({
      message: "An otp was sent to your number.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
  }
};

const verifyLoginOrRegister = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const result = await getOneUserByMobileDB(mobile);

    if (!result || result.otp !== otp) {
      return res.json({ success: false });
    }
    result.otp = undefined;
    res.json({
      message: "You are logged in successfully.",
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
  }
};

module.exports = {
  handleLoginOrRegister,
  verifyLoginOrRegister,
};
