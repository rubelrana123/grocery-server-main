const fse = require("fs-extra");
const imagekit = require("../configs/imageKitConfig");

const uploadFileImageKit = async (file) => {
  const filePath = file.path;
  const fileName = file.originalname;
  const fileBuffer = await fse.readFile(filePath);

  const result = await imagekit.upload({
    file: fileBuffer,
    fileName: fileName,
  });

  await fse.unlink(filePath);
  return result;
};

module.exports = uploadFileImageKit;
