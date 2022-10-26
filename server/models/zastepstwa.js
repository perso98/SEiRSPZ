module.exports = (sequelize, DataTypes) => {
    const zastepstwa = sequelize.define(
      "zastepstwa",
      {
        idDyrektora: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
      },
      {
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  
    zastepstwa.associate = (models) => {
      zastepstwa.belongsTo(models.user, {
        foreignKey: {
          allowNull: true,
        }
      });
    };
  
  
    return zastepstwa;
  };
  