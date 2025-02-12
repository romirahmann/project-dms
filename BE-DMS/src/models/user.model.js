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
      "u.statusId",
      "g.grupName",
      "g.grupDescription",
      "s.statusName"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .leftJoin("tbl_status as s", "u.statusId", "s.statusId");
const getById = async (id) =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.userId",
      "u.email",
      "u.fullname",
      "u.grupId",
      "u.statusId",
      "g.grupName",
      "g.grupDescription",
      "s.statusName"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .leftJoin("tbl_status as s", "u.statusId", "s.statusId")
    .where("u.userId", id);
const insert = async (data) => await db("tbl_users").insert(data);
const update = async (id, data) =>
  await db("tbl_users").where("userId", id).update(data);

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
};
