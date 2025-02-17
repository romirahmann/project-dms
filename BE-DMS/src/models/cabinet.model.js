const db = require("../database/db.config");

const getAll = async () =>
  await db
    .select(
      "c.cabinetId",
      "c.cabinetName",

      "c.isActive",
      "t.tenantName"
    )
    .from("tbl_cabinets as c")
    .join("tbl_tenants as t", "t.tenantId", "c.tenantId");
const getById = async (id) =>
  await db
    .select(
      "c.cabinetId",
      "c.cabinetName",

      "c.isActive",
      "t.tenantName"
    )
    .from("tbl_cabinets as c")
    .join("tbl_tenants as t", "t.tenantId", "c.tenantId")
    .where("c.cabinetId", id);
const insert = async (data) => await db("tbl_cabinets").insert(data);
const update = async (id, data) =>
  await db("tbl_cabinets").where("cabinetId", id).update(data);
const del = async (id) =>
  await db("tbl_cabinets").where("cabinetId", id).delete();
module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
};
