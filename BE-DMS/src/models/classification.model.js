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

async function addTblStructure(classificationId) {
  await db.raw(
    `CREATE TABLE tbl_structure${classificationId} (structureId INT auto_increment PRIMARY KEY NOT NULL, name varchar(50) NOT NULL, type varchar(50) NOT NULL, fieldSize int NULL )`
  );
}

const insertFieldStructure = async (classificationId, data) =>
  await db(`tbl_structure${classificationId}`).insert(data);

const addTblDetail = async (classificationId, data) =>
  await db.raw(
    `CREATE TABLE tbl_detail${classificationId} (detailId INT auto_increment PRIMARY KEY NOT NULL, ${
      data.name
    } ${data.type}${
      data.type === "varchar" ? `(${data.fieldSize || 255})` : ""
    } NULL )`
  );
const addColumnDetail = async (classificationId, data) =>
  await db.raw(
    `ALTER TABLE tbl_detail${classificationId} ADD COLUMN ${data.name} ${
      data.type
    }${data.type === "varchar" ? `(${data.fieldSize || 255})` : ""} NULL  `
  );

const insertFieldDetail = async (classificationId, data) =>
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

const getStructureByClassification = async (classificationId) =>
  await db.select("*").from(`tbl_structure${classificationId}`);

const getStructureById = async (classificationId, structureId) =>
  await db
    .select("*")
    .from(`tbl_structure${classificationId}`)
    .where("structureId", structureId);

const updateFieldStructure = async (classificationId, structureId, data) =>
  await db(`tbl_structure${classificationId}`)
    .where("structureId", structureId)
    .update(data);

const updateColoumnDetail = async (classificationId, dataName, data) =>
  await db.raw(
    `ALTER TABLE tbl_detail${classificationId} 
    CHANGE COLUMN ${dataName} ${data.name} ${data.type}${
      data.type === "varchar" ? `(${data.fieldSize || 255})` : ""
    } NULL;`
  );

const getDetailByClassification = async (classificationId) =>
  await db.select("*").from(`tbl_detail${classificationId}`);

const updateDetail = async (classificationId, detailId, data) =>
  await db(`tbl_detail${classificationId}`)
    .where("detailId", detailId)
    .update(data);

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
  addTblStructure,
  structureExist,
  insertFieldStructure,
  addTblDetail,
  detailExist,
  addColumnDetail,
  insertFieldDetail,
  getStructureByClassification,
  getDetailByClassification,
  updateFieldStructure,
  updateDetail,
  getStructureById,
  updateColoumnDetail,
};
