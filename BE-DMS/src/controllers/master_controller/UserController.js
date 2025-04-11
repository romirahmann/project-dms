const model = require("../../models/user.model");
const api = require("../../tools/common");
const { Hashing, verifyHash } = require("../../services/hashing.service");

const getAllUser = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    let data = await model.getById(userId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const register = async (req, res) => {
  const newUser = req.body;
  try {
    newUser.password = await Hashing(newUser.password);

    let exitingUser = await model.existingUsername(newUser.username);
    console.log(exitingUser);
    if (exitingUser) {
      return api.error(res, "Username Already Exist", 400);
    }
    let data = await model.insert(newUser);

    // Emit event ke semua client bahwa ada user baru
    const io = req.app.get("socketio");
    io.emit("userUpdated", {
      type: "UPDATE_USERS",
      users: await model.getAll(),
    });

    return api.ok(res, data);
  } catch (e) {
    return api.error(res, e, 500);
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const newUser = req.body;
  try {
    let data = await model.update(userId, newUser);

    // Emit event ke semua client bahwa user diperbarui
    const io = req.app.get("socketio");
    io.emit("userUpdated", {
      type: "UPDATE_USERS",
      users: await model.getAll(),
    });

    return api.ok(res, data);
  } catch (e) {
    return api.error(res, e, 500);
  }
};

// GRUP
const insertGrup = async (req, res) => {
  const newGrup = req.body;

  try {
    let data = await model.insertGrup(newGrup);

    // Emit event ke semua client bahwa ada grup baru
    const io = req.app.get("socketio");
    io.emit("groupUpdated", {
      type: "UPDATE_GROUPS",
      groups: await model.getAllGrup(),
    });

    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getAllGrup = async (req, res) => {
  try {
    let data = await model.getAllGrup();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getGrupById = async (req, res) => {
  const { grupId } = req.params;
  try {
    let data = await model.getGrupById(grupId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const updateGrup = async (req, res) => {
  const { grupId } = req.params;
  const newGrup = req.body;

  try {
    let data = await model.updateGrup(grupId, newGrup);

    // Emit event ke semua client bahwa grup diperbarui
    const io = req.app.get("socketio");
    io.emit("groupUpdated", {
      type: "UPDATE_GROUPS",
      groups: await model.getAllGrup(),
    });

    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const removeGrup = async (req, res) => {
  const { grupId } = req.params;
  try {
    let data = await model.delGrup(grupId);

    // Emit event ke semua client bahwa grup dihapus
    const io = req.app.get("socketio");
    io.emit("groupUpdated", {
      type: "UPDATE_GROUPS",
      groups: await model.getAllGrup(),
    });

    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const resetPassword = async (req, res) => {
  const userId = req.params.id;
  const dataPassword = req.body;
  console.log(userId, dataPassword);
  try {
    let dataUser = await model.getById(userId);
    // console.log(dataUser[0].password);
    let oldPasswordMatch = await verifyHash(
      dataPassword.oldPassword,
      dataUser[0].password
    );
    if (!oldPasswordMatch) {
      return api.error(res, "Password sebelumnya tidak sesuai!", 400);
    }

    let newPassword = await Hashing(dataPassword.newPassword);

    let data = {
      password: newPassword,
    };

    let result = await model.update(userId, data);
    return api.ok(res, result);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  register,
  insertGrup,
  getAllUser,
  getUserById,
  updateUser,
  getAllGrup,
  getGrupById,
  updateGrup,
  removeGrup,
  resetPassword,
};
