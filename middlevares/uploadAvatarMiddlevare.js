const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const { _id } = req.user;
    const [_, extension] = file.originalname.split(".");
    cb(null, `${_id}.${extension}`);
  },
});

const uploadAvatarMiddlevare = multer({ storage });

module.exports = { uploadAvatarMiddlevare };
