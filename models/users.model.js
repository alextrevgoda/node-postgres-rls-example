module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("rapid_user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.STRING,
      field: "full_name",
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

  return User;
};
