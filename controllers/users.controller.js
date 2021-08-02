const { decorate } = require("../middleware/rls.middleware");
const { Sequelize, users: User } = require("../models");

const Op = Sequelize.Op;

// Create and Save a new User
const create = (req, res) => {
  const { username, fullName } = req.body;
  const user = {
    username,
    fullName,
  };

  return User.create(user, { transaction: req.t })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
const findAll = async (req, res) => {
  const { query } = req.query;
  const condition = query
    ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { fullName: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : null;

  await User.findAll({ where: condition, transaction: req.t })
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

// Find a single User with an id
const findOne = (req, res) => {
  const { id } = req.params;

  return User.findByPk(id, { transaction: req.t })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
const update = (req, res) => {
  const { id } = req.params;

  return User.update(req.body, {
    transaction: req.t,
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
const deleteUser = (req, res) => {
  const { id } = req.params;

  return User.destroy({
    transaction: req.t,
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
const deleteAll = (req, res) => {
  return Api.destroy({
    transaction: req.t,
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
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
  delete: decorate(deleteUser),
  deleteAll: decorate(deleteAll),
};
