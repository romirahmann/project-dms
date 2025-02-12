const model = require("../../models/cabinet.model");
const api = require("../../tools/common");

const getAllCabinet = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getCabinetById = async (req, res) => {
  const { cabinetId } = req.params;
  try {
    let data = await model.getById(cabinetId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const addCabinet = async (req, res) => {
  const newCabinet = req.body;
  try {
    let data = await model.insert(newCabinet);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const updateCabinet = async (req, res) => {
  const { cabinetId } = req.params;
  const newCabinet = req.body;
  try {
    let data = await model.update(cabinetId, newCabinet);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const removeCabinet = async (req, res) => {
  const { cabinetId } = req.params;
  try {
    let data = await model.del(cabinetId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

module.exports = {
  getAllCabinet,
  getCabinetById,
  addCabinet,
  updateCabinet,
  removeCabinet,
};
