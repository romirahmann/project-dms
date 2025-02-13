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

async function addNewStructure(classificationId) {
  await db.raw(
    `CREATE TABLE tbl_structure${classificationId} (structureId INT auto_increment PRIMARY KEY NOT NULL, name varchar(50) NOT NULL, type varchar(50) NOT NULL, fieldSize int NULL )`
  );
}

const insertDataStructure = async (classificationId, data) =>
  await db(`tbl_structure${classificationId}`).insert(data);

const addDetail = async (classificationId, data) =>
  await db.raw(
    `CREATE TABLE tbl_detail${classificationId} (detailId INT auto_increment PRIMARY KEY NOT NULL, ${
      data.name
    } ${data.type}${
      data.type === "varchar" ? `(${data.fieldSize || 255})` : ""
    } NULL )`
  );
const insertDataDetail = async (classificationId, data) =>
  await db.raw(
    `ALTER TABLE tbl_detail${classificationId} ADD COLUMN ${data.name} ${
      data.type
    }${data.type === "varchar" ? `(${data.fieldSize || 255})` : ""} NULL  `
  );

const insertDetail = async (classificationId, data) =>
  await db(`tbl_detail${classificationId}`).insert(data);

const structureExist = async (classificationId) => {
  const tableName = `tbl_structure${classificationId}`;

  const result = await db("information_schema.tables")
    .where("table_schema", "dms")
    .andWhere("table_name", tableName)
    .count("* as count")
    .first();

  return result.count > 0;
};
const detailExist = async (classificationId) => {
  const tableName = `tbl_detail${classificationId}`;

  const result = await db("information_schema.tables")
    .where("table_schema", "dms")
    .andWhere("table_name", tableName)
    .count("* as count")
    .first();

  return result.count > 0;
};

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
  addNewStructure,
  structureExist,
  insertDataStructure,
  addDetail,
  detailExist,
  insertDataDetail,
  insertDetail,
};
