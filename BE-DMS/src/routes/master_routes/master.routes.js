const express = require("express");
const router = express.Router();
const Joi = require("joi");

const routesData = require("./routes.data.json");
const { upload } = require("../../services/upload.service"); // Import middleware upload

const UserController = require("../../controllers/master_controller/UserController");
const CabinetController = require("../../controllers/master_controller/CabinetController");
const SettingController = require("../../controllers/master_controller/SettingController");
const PermissionController = require("../../controllers/master_controller/PermissionController");
const ClassificationController = require("../../controllers/master_controller/ClassificationController");
const TenantController = require("../../controllers/master_controller/TenantController");
const UploadController = require("../../controllers/master_controller/UploadController");

const controllers = {
  UserController,
  CabinetController,
  SettingController,
  PermissionController,
  ClassificationController,
  TenantController,
  UploadController,
};

const routeSchema = Joi.object({
  method: Joi.string().valid("get", "post", "put", "delete").required(),
  path: Joi.string().required(),
  controller: Joi.string().required(),
  middleware: Joi.string().optional(),
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
    // Cek apakah route memiliki middleware
    if (route.middleware) {
      // Middleware hanya mendukung `upload.single('file')` dalam bentuk string
      if (route.middleware === "upload.single('file')") {
        router[route.method](
          route.path,
          upload.single("file"),
          controller[methodName]
        );
      } else {
        console.error(
          `Invalid middleware configuration for path '${route.path}'`
        );
      }
    } else {
      router[route.method](route.path, controller[methodName]);
    }
  }
});

module.exports = router;
