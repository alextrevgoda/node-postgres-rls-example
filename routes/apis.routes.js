const apis = require("../controllers/apis.controller.js");
const router = require("express").Router();

module.exports = app => {
  // Create a new Api
  router.post("/", apis.create);

  // Retrieve all Apis
  router.get("/", apis.findAll);

  // Retrieve a single Api with id
  router.get("/:id", apis.findOne);

  // Update a Api with id
  router.put("/:id", apis.update);

  // Delete a Api with id
  router.delete("/:id", apis.delete);

  // Delete all Apis
  router.delete("/", apis.deleteAll);

  app.use("/api/apis", router);
};
