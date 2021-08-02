module.exports = (sequelize, Sequelize) => {
  const Api = sequelize.define("api", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      field: "created_by",
      references: { model: { tableName: "rapid_user" }, key: "id" },
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at",
    },
  });

  return Api;
};
