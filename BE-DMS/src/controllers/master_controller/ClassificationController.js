const model = require("../../models/classification.model");
const api = require("../../tools/common");
// CLASSIFICATION
const getAllClassification = async (req, res) => {
  try {
    let data = await model.getAllClassification();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const getClassificationById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getClassificationById(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertClassification = async (req, res) => {
  const newType = req.body;
  try {
    let data = await model.insertClassification(newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateClassification = async (req, res) => {
  const { id } = req.params;
  const newType = req.body;
  try {
    let data = await model.updateClassification(id, newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const deleteClassification = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.delClassification(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

// TYPE DATA
const getAllType = async (req, res) => {
  try {
    let data = await model.getAllType();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const getTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getTypeById(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertType = async (req, res) => {
  const newType = req.body;
  try {
    let data = await model.insertType(newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateType = async (req, res) => {
  const { id } = req.params;
  const newType = req.body;
  try {
    let data = await model.updateType(id, newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const deleteType = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.delType(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

module.exports = {
  getAllClassification,
  getClassificationById,
  insertClassification,
  updateClassification,
  deleteClassification,
  getAllType,
  getTypeById,
  insertType,
  updateType,
  deleteType,
};
