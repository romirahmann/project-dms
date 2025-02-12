const argon2 = require("argon2");

const Hashing = async (palinText) => {
  try {
    const hashedText = await argon2.hash(palinText, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 2,
    });
    return hashedText;
  } catch (e) {
    console.error("Error hasing password: ", e);
    throw e;
  }
};

const verifyHash = async (plainText, hashedText) => {
  try {
    if (
      !hashedText ||
      typeof hashedText !== "string" ||
      hashedText.trim() === ""
    ) {
      throw new Error("Invalid hash password: hash is empty or not a string");
    }

    const textIsMatch = await argon2.verify(hashedText, plainText);
    return textIsMatch;
  } catch (err) {
    console.log("Error verifying password:", err);
    throw err;
  }
};
module.exports = {
  Hashing,
  verifyHash,
};
