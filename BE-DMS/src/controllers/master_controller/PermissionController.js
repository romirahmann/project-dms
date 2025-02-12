const model = require("../../models/permission.model");
const api = require("../../tools/common");

const getAllPermission = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getById(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updatePermission = async (req, res) => {
  const newPermission = req.body;
  const { id } = req.params;
  try {
    let data = await model.update(id, newPermission);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertPermission = async (req, res) => {
  const newPermission = req.body;
  try {
    let data = await model.insert(newPermission);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.del(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

module.exports = {
  getAllPermission,
  getPermissionById,
  updatePermission,
  insertPermission,
  deletePermission,
};
