const model = require("../../models/setting.model");
const api = require("../../tools/common");

const getSettingFolder = async (req, res) => {
  try {
    let data = await model.getSettingFolders();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertSettingFolder = async (req, res) => {
  const newSetting = req.body;
  try {
    let data = await model.insertSettingFolder(newSetting);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateSettingFolder = async (req, res) => {
  const newSetting = req.body;
  const { id } = req.params;
  try {
    let data = await model.updateSettingFolder(id, newSetting);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const getSettingSmtp = async (req, res) => {
  try {
    let data = await model.getSmtp();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertSettingSmtp = async (req, res) => {
  const newSetting = req.body;
  try {
    let data = await model.insertSmtp(newSetting);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateSettingSmtp = async (req, res) => {
  const newSetting = req.body;
  const { id } = req.params;
  try {
    let data = await model.updateSmtp(id, newSetting);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

module.exports = {
  getSettingFolder,
  insertSettingFolder,
  updateSettingFolder,
  getSettingSmtp,
  insertSettingSmtp,
  updateSettingSmtp,
};
