const db = require("../database/db.config");

const getAll = async () =>
  await db
    .select(
      "c.cabinetId",
      "c.cabinetName",
      "c.cabinetDescription",
      "c.licenseId",
      "c.statusId",
      "l.licenseCode",
      "l.licenseName",
      "l.licenseExpired",
      "l.licenseDescription"
    )
    .from("tbl_cabinet as c")
    .join("tbl_license as l", "l.licenseId", "c.licenseId");
const getById = async (id) =>
  await db
    .select(
      "c.cabinetId",
      "c.cabinetName",
      "c.cabinetDescription",
      "c.licenseId",
      "c.statusId",
      "l.licenseCode",
      "l.licenseName",
      "l.licenseExpired",
      "l.licenseDescription"
    )
    .from("tbl_cabinet as c")
    .join("tbl_license as l", "l.licenseId", "c.licenseId")
    .where("c.cabinetId", id);
const insert = async (data) => await db("tbl_cabinet").insert(data);
const update = async (id, data) =>
  await db("tbl_cabinet").where("cabinetId", id).update(data);
const del = async (id) =>
  await db("tbl_cabinet").where("cabinetId", id).delete();
module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
};
