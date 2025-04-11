const db = require("../database/db.config");

// USERS
const getAll = async () =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.userId",
      "u.email",
      "u.fullname",
      "u.grupId",
      "u.isActive",
      "t.tenantName",
      "g.grupName",
      "g.grupDescription"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId");

const getById = async (id) =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.userId",
      "u.email",
      "u.fullname",
      "u.grupId",
      "u.isActive",
      "u.password",
      "t.tenantName",
      "g.grupName",
      "g.grupDescription"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId")
    .where("u.userId", id);
const insert = async (data) => await db("tbl_users").insert(data);
const update = async (id, data) =>
  await db("tbl_users").where("userId", id).update(data);

const existingUsername = async (username) => {
  const [existingUser] = await db("tbl_users")
    .count("username as count")
    .where("username", username);

  return existingUser.count > 0;
};
// USER GRUP
const getAllGrup = async () =>
  await db
    .select("grupId", "grupName", "grupDescription", "createdAt", "updateAt")
    .from("tbl_grup_user");
const insertGrup = async (data) => await db("tbl_grup_user").insert(data);
const getGrupById = async (id) =>
  await db
    .select("grupId", "grupName", "grupDescription", "createdAt", "updateAt")
    .from("tbl_grup_user")
    .where("grupId", id);
const updateGrup = async (id, data) =>
  await db("tbl_grup_user").where("grupId", id).update(data);

const delGrup = async (id) =>
  await db("tbl_grup_user").where("grupId", id).delete();

module.exports = {
  getAll,
  getById,
  insert,
  insertGrup,
  getAllGrup,
  updateGrup,
  delGrup,
  getGrupById,
  update,
  existingUsername,
};
