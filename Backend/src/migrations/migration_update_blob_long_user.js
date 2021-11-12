module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "numberPhone", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Users",
        "image",
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
      queryInterface.changeColumn(
        "Users",
        "numberPhone",
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};
