module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      haslo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isStudent: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
      },
      isOpiekunZakl: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      isOpiekun: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      isDyrektor: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      isDziekanat: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      isAdmin: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      id_opiekunU: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_opiekunZ: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  )

  user.associate = (models) => {
    user.belongsTo(models.dane, {
      foreignKey: {
        allowNull: true,
      },
    });
    user.belongsTo(models.dane, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  user.associate = (models) => {
    user.hasMany(models.dziennik, {
      onDelete: "cascade",
    });
    user.hasMany(models.komentarze, {
      onDelete: "cascade",
    })
    user.hasMany(models.efektyStudent, {
      onDelete: "cascade",
    });
    user.hasMany(models.zastepstwa, {
      onDelete: "cascade",
    });
  }


  return user;
};
