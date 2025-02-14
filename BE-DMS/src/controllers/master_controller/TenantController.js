const model = require("./../../models/tenant.model");
const api = require("../../tools/common");

const getAllTenant = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch (err) {
    return api.error(res, err, 500);
  }
};
const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getById(id);
    return api.ok(res, data);
  } catch (err) {
    return api.error(res, err, 500);
  }
};
const addTenant = async (req, res) => {
  const data = req.body;
  try {
    let result = await model.insert(data);
    return api.ok(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};
const updateTenant = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    let result = await model.update(id, data);
    return api.ok(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};

const softDeleteTenant = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    let result = await model.update(id, data);
    return api.ok(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};
const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await model.del(id);
    return api.ok(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};

module.exports = {
  getAllTenant,
  getTenantById,
  addTenant,
  updateTenant,
  softDeleteTenant,
  deleteTenant,
};
