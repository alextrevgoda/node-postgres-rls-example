const users = require("../controllers/users.controller.js");
const router = require("express").Router();

module.exports = app => {
  // Create a new Api
  router.post("/", users.create);

  // Retrieve all Apis
  router.get("/", users.findAll);

  // Retrieve a single Api with id
  router.get("/:id", users.findOne);

  // Update a Api with id
  router.put("/:id", users.update);

  // Delete a Api with id
  router.delete("/:id", users.delete);

  // Delete all Apis
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
