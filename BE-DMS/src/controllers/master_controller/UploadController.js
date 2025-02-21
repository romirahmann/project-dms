const model = require("../../models/classification.model");
const api = require("../../tools/common");
const uploadService = require("../../services/upload.service");
const fs = require("fs-extra");
const path = require("path");

const documentsFolder = path.join(__dirname, "../../documents");
fs.ensureDir(documentsFolder);

const uploadFile = async (req, res) => {
  try {
    let newData = req.body;
    let file = req.file;

    if (!file) {
      return api.error(res, "File Not Found", 500);
    }

    const storedFilename =
      Date.now() + "_" + Math.random().toString(36).substr(2, 9) + ".enc";
    const encryptedFilePath = path.join(documentsFolder, storedFilename);
    uploadService.encryptFile(file.buffer, encryptedFilePath);

    const fillData = {
      original_filename: file.originalname,
      stored_filename: storedFilename,
      filepath: encryptedFilePath,
      mimetype: file.mimetype,
      size: file.size,
    };

    console.log(fillData);
  } catch (e) {
    api.error(res, e, 500);
  }
};

const getFile = async (req, res) => {
  try {
    const storedFilename = req.params.storedFilename;
    const documentDir = path.join(__dirname, "../../documents");
    const filePath = path.join(documentDir, storedFilename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${storedFilename}"`
    );
    const file = uploadService.decryptFile(filePath, res);
    res.send(file);
  } catch (error) {
    console.error("Error decrypting file:", error);
    res.status(500).json({ message: "Failed to decrypt file" });
  }
};

module.exports = { uploadFile, getFile };
