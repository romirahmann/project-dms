const db = require("../database/db.config");

const getSettingFolders = async () =>
  await db
    .select(
      "settingFolderId",
      "locationDoc",
      "tempLocation",
      "backupLocation",
      "autoScanLocation",
      "maxFile"
    )
    .from("tbl_setting_folder")
    .first();

const insertSettingFolder = async (data) =>
  await db("tbl_setting_folder").insert(data);
const updateSettingFolder = async (id, data) =>
  await db("tbl_setting_folder").where("settingFolderId", id).update(data);
const deleteSettingFolder = async (id) =>
  await db("tbl_setting_folder").where("settingFolderId", id).delete();

const getSmtp = async () =>
  await db
    .select(
      "smtpId",
      "email",
      "authentification",
      "port",
      "server",
      "ssl",
      "user",
      "password"
    )
    .from("tbl_smtp")
    .first();

const insertSmtp = async (data) => await db("tbl_smtp").insert(data);
const updateSmtp = async (id, data) =>
  await db("tbl_smtp").where("smtpId", id).update(data);

module.exports = {
  getSettingFolders,
  insertSettingFolder,
  updateSettingFolder,
  deleteSettingFolder,
  getSmtp,
  insertSmtp,
  updateSmtp,
};
