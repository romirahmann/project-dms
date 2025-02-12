const db = require("../database/db.config");
// CLASSIFICATIONS
const getAllClassification = async () =>
  await db.select("*").from("tbl_classification");
const getClassificationById = async (id) =>
  await db.select("*").from("tbl_classification").where("classificationId", id);
const insertClassification = async (data) =>
  db("tbl_classification").insert(data);
const updateClassification = async (id, data) =>
  db("tbl_classification").where("classificationId", id).update(data);
const delClassification = async (id) =>
  db("tbl_classification").where("classificationId", id).delete();

// CRUD TYPE DATA
const getAllType = async () => await db.select("*").from("tbl_typedata");
const getTypeById = async (id) =>
  await db.select("*").from("tbl_typedata").where("typeId", id);
const insertType = async (data) => db("tbl_typedata").insert(data);
const updateType = async (id, data) =>
  db("tbl_typedata").where("typeId", id).update(data);
const delType = async (id) => db("tbl_typedata").where("typeId", id).delete();

module.exports = {
  getAllClassification,
  getClassificationById,
  insertClassification,
  updateClassification,
  delClassification,
  getAllType,
  getTypeById,
  insertType,
  updateType,
  delType,
};
