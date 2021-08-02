const { decorate } = require("../middleware/rls.middleware");
const { Sequelize, apis: Api } = require("../models");

const Op = Sequelize.Op;

// Create and Save a new Api
const create = (req, res) => {
  const { name } = req.body;
  const { id } = req.user;

  const api = {
    name,
    createdBy: id,
  };

  return Api.create(api, { transaction: req.t })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Api.",
      });
    });
};

// Retrieve all Apis from the database.
const findAll = async (req, res) => {
  const { name } = req.query;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  return Api.findAll({ where: condition, transaction: req.t })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Api with an id
const findOne = (req, res) => {
  const { id } = req.params;

  return Api.findByPk(id, { transaction: req.t })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Api with id=" + id,
      });
    });
};

// Update a Api by the id in the request
const update = (req, res) => {
  const { id } = req.params;

  return Api.update(req.body, {
    transaction: req.t,
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Api was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Api with id=${id}. Maybe Api was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Api with id=" + id,
      });
    });
};

// Delete a Api with the specified id in the request
const deleteApi = (req, res) => {
  const { id } = req.params;

  return Api.destroy({
    transaction: req.t,
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Api was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Api with id=${id}. Maybe Api was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Api with id=" + id,
      });
    });
};

// Delete all Apis from the database.
const deleteAll = (req, res) => {
  return Api.destroy({
    transaction: req.t,
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Apis were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

module.exports = {
  create: decorate(create),
  findAll: decorate(findAll),
  findOne: decorate(findOne),
  update: decorate(update),
  delete: decorate(deleteApi),
  deleteAll: decorate(deleteAll),
};
