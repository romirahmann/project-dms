const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

const storage = multer.memoryStorage();
const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(
  "0G8dN5uVzJ8voTLKi5MJ5D4r8vf2r7p8ymtAo3f+Ink=",
  "base64"
);
const iv = Buffer.from("YQk7JZJfMwJbv8x77+vgOg==", "base64");

const upload = multer({
  storage: storage,
});

const encryptFile = (buffer, outputPath) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  fs.writeFileSync(outputPath, encrypted);
};

// Fungsi untuk mendekripsi file saat diakses
const decryptFile = (inputPath, res) => {
  const encryptedData = fs.readFileSync(inputPath);
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);
  res.send(decrypted);
};

module.exports = {
  upload,
  encryptFile,
  decryptFile,
};
