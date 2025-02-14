const db = require("./../database/db.config");

const getAll = async () =>
  await db
    .select(
      "t.tenantId",
      "t.tenantName",
      "t.tenantDescription",
      "t.licenseId",
      "t.isActive",
      "l.licenseCode",
      "l.licenseName",
      "l.licenseExpired"
    )
    .from("tbl_tenants as t")
    .join("tbl_license as l", "l.licenseId", "t.licenseId");
const getById = async (id) =>
  await db
    .select(
      "t.tenantId",
      "t.tenantName",
      "t.tenantDescription",
      "t.licenseId",
      "t.isActive",
      "l.licenseCode",
      "l.licenseName",
      "l.licenseExpired"
    )
    .from("tbl_tenants as t")
    .join("tbl_license as l", "l.licenseId", "t.licenseId")
    .where("t.tenantId", id);
const insert = async (data) => await db("tbl_tenants").insert(data);
const update = async (id, data) =>
  await db("tbl_tenants").where("tenantId", id).insert(data);
const del = async (id) =>
  await db("tbl_tenants").where("tenantId", id).delete();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
};
