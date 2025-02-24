const model = require("../../models/user.model");
const api = require("../../tools/common");
const { Hashing } = require("../../services/hashing.service");

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
    let data = await model.insert(newUser);
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
  console.log(newGrup);
  try {
    let data = await model.updateGrup(grupId, newGrup);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const removeGrup = async (req, res) => {
  const { grupId } = req.params;
  try {
    let data = await model.delGrup(grupId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
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
};
