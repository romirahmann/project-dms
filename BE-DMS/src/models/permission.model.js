const db = require("../database/db.config");

const getAll = async () =>
  await db
    .select(
      "p.permissionDocId",
      "p.classificationId",
      "p.grupId",
      "p.grupId",
      "p.updateAt",
      "p.view",
      "p.edit",
      "p.delete",
      "p.download",
      "p.print",
      "p.move",
      "p.share",
      "p.version",
      "p.report",
      "p.permission",
      "c.classificationName",
      "g.grupName"
    )
    .from("tbl_permission_doc as p")
    .join("tbl_classification as c", "c.classificationId", "p.classificationId")
    .leftJoin("tbl_grup_user as g", "g.grupId", "p.grupId");

const getById = async (id) =>
  await db
    .select(
      "p.permissionDocId",
      "p.classificationId",
      "p.grupId",
      "p.grupId",
      "p.updateAt",
      "p.view",
      "p.edit",
      "p.delete",
      "p.download",
      "p.print",
      "p.move",
      "p.share",
      "p.version",
      "p.report",
      "p.permission",
      "c.classificationName",
      "g.grupName"
    )
    .from("tbl_permission_doc as p")
    .join("tbl_classification as c", "c.classificationId", "p.classificationId")
    .leftJoin("tbl_grup_user as g", "g.grupId", "p.grupId")
    .where("permissionId", id);
const getByClassificationGrup = async (classificationId, grupId) =>
  await db
    .select(
      "p.permissionDocId",
      "p.classificationId",
      "p.grupId",
      "p.grupId",
      "p.updateAt",
      "p.view",
      "p.edit",
      "p.delete",
      "p.download",
      "p.print",
      "p.move",
      "p.share",
      "p.version",
      "p.report",
      "p.permission",
      "c.classificationName",
      "g.grupName"
    )
    .from("tbl_permission_doc as p")
    .join("tbl_classification as c", "c.classificationId", "p.classificationId")
    .leftJoin("tbl_grup_user as g", "g.grupId", "p.grupId")
    .where("p.classificationId", classificationId)
    .andWhere("p.grupId", grupId);
const insert = async (data) => await db("tbl_permission_doc").insert(data);
const update = async (id, data) =>
  await db("tbl_permession").where("permissionId", id).update(data);
const del = async (id) =>
  await db("tbl_permission_doc").where("permissionId", id).delete();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
  getByClassificationGrup,
};
