const express = require("express");
const router = express.Router();
const Joi = require("joi");

const routesData = require("./routes.data.json");
const UserController = require("../../controllers/master_controller/UserController");
const CabinetController = require("../../controllers/master_controller/CabinetController");
const SettingController = require("../../controllers/master_controller/SettingController");
const PermissionController = require("../../controllers/master_controller/PermissionController");
const ClassificationController = require("../../controllers/master_controller/ClassificationController");

const controllers = {
  UserController,
  CabinetController,
  SettingController,
  PermissionController,
  ClassificationController,
};

const routeSchema = Joi.object({
  method: Joi.string().valid("get", "post", "put", "delete").required(),
  path: Joi.string().required(),
  controller: Joi.string().required(),
});

routesData.forEach((route) => {
  const { error } = routeSchema.validate(route);
  if (error) {
    console.error(
      `Invalid route configuration for path '${route.path}': ${error.details[0].message}`
    );
    return;
  }

  const [controllerName, methodName] = route.controller.split(".");
  const controller = controllers[controllerName];

  if (controller && typeof controller[methodName] === "function") {
    router[route.method](route.path, controller[methodName]);
  }
});

module.exports = router;
