const model = require("../../models/classification.model");
const api = require("../../tools/common");
// CLASSIFICATION
const getAllClassification = async (req, res) => {
  try {
    let data = await model.getAllClassification();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const getClassificationById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getClassificationById(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertClassification = async (req, res) => {
  const newData = req.body;
  try {
    let classificationId = await model.insertClassification(newData);
    let data = await model.addTblStructure(classificationId);
    return api.ok(res, { messege: "Add Classification Successfully!" });
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateClassification = async (req, res) => {
  const { id } = req.params;
  const newType = req.body;
  try {
    let data = await model.updateClassification(id, newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const deleteClassification = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.delClassification(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const insertFieldStructure = async (req, res) => {
  const { classificationId } = req.params;
  const newData = req.body;
  const formatStructureName = (name) => {
    return name.toLowerCase().replace(/\s+/g, "_");
  };

  try {
    let structureIsExict = await model.structureExist(classificationId);

    if (structureIsExict) {
      let result = await model.insertFieldStructure(classificationId, newData);
      newData.name = formatStructureName(newData.name);
      let detailIsExist = await model.detailExist(classificationId);
      if (!detailIsExist) {
        let result = await model.addTblDetail(classificationId, newData);
        return api.ok(res, result);
      } else {
        let result = await model.addColumnDetail(classificationId, newData);
        return api.ok(res, result);
      }
    } else {
      return api.error(res, "Structure Not Found!", 400);
    }
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const insertTblDetail = async (req, res) => {
  const { classificationId } = req.params;
  const data = req.body;
  try {
    let result = await model.insertFieldDetail(classificationId, data);
    return api.ok(res, result);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getStructuresByClassification = async (req, res) => {
  const { classificationId } = req.params;
  try {
    let data = await model.getStructureByClassification(classificationId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const updateFieldStructure = async (req, res) => {
  const { classificationId, structureId } = req.params;
  const newData = req.body;
  const structureData = await model.getStructureById(structureId);
  try {
    let result = await model.updateFieldStructure(
      classificationId,
      structureId,
      newData
    );
    let result2 = await model.updateColoumnDetail(
      classificationId,
      structureData.name,
      newData
    );
    return api.ok(res, { result, result2 });
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const getDetailsByClassification = async (req, res) => {
  const { classificationId } = req.params;
  try {
    let data = await model.getDetailByClassification(classificationId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

// TYPE DATA
const getAllType = async (req, res) => {
  try {
    let data = await model.getAllType();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const getTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getTypeById(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const insertType = async (req, res) => {
  const newType = req.body;
  try {
    let data = await model.insertType(newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};
const updateType = async (req, res) => {
  const { id } = req.params;
  const newType = req.body;
  try {
    let data = await model.updateType(id, newType);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

const deleteType = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.delType(id);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, error, 500);
  }
};

module.exports = {
  getAllClassification,
  getClassificationById,
  insertClassification,
  updateClassification,
  deleteClassification,
  getAllType,
  getTypeById,
  insertType,
  updateType,
  deleteType,
  insertFieldStructure,
  insertTblDetail,
  getStructuresByClassification,
  getDetailsByClassification,
  updateFieldStructure,
};
