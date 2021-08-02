const { sequelize } = require("../models");

const decorate = (func) => async (req, res) => {
  const { id } = req.user;
  try {
    await sequelize.transaction(async (t) => {
      await sequelize.query("SET LOCAL app.user_id = :id;", {
        replacements: { id: id || '-1' },
        transaction: t,
      });
      const result = await func({ ...req, t }, res);
      await sequelize.query("RESET app.user_id;", {
        transaction: t,
      });
      return result;
    });
  } catch (error) {
    console.log("[ERROR] ", error);
  }
};

module.exports = {
  decorate,
};
