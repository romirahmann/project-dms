const model = require("../../models/auth.model");
const api = require("../../tools/common");
const { generateToken } = require("../../services/auth.service");
const hashing = require("../../services/hashing.service");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return api.error(res, "Please provide both username and password", 400);
  }

  let user = await model.login(username);

  if (user.length > 0) {
    user = user[0];

    if (!user.password || typeof user.password !== "string") {
      return api.error(res, "Invalid stored password", 500);
    }

    const passwordIsMatch = await hashing.verifyHash(password, user.password);
    if (passwordIsMatch) {
      const payload = {
        id: user.userId,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        grupId: user.grupId,
        grupName: user.grupName,
        tentantName: user.tentantName,
      };
      const token = generateToken(payload);
      res.json({ token, user: payload });
    } else {
      return api.error(res, "Incorrect Password!", 400);
    }
  } else {
    return api.error(res, "Account Not Found", 404);
  }
};

module.exports = {
  login,
};
