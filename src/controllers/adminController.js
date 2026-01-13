const bcrypt = require("bcrypt");
const {
  handleAdminRegisterDB,
  getOneAdminByEmailDB,
} = require("../services/adminService");

const handleAdminRegister = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      email: email,
      password: hashedPassword,
    };
    const result = await handleAdminRegisterDB(data);

    if (!result) {
      return res.json({ message: false });
    }
    res.json({
      message: "You are registered successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const user = await getOneAdminByEmailDB(email);

    if (!user) {
      return res.json({ message: "Wrong email or password." });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Wrong email or password." });
    }
    res.json({
      userId: user.id,
      message: "You are logged in successfully.",
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
  handleAdminRegister,
  handleAdminLogin,
};
