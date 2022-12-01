module.exports = (sequelize, DataTypes) => {
  const dziennik = sequelize.define(
    "dziennik",
    {
      dzien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ilosc_godzin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      opis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statusOpiekunaU: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statusOpiekunaZ: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LaststatusOpiekunaZ: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LaststatusOpiekunaU: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  dziennik.associate = (models) => {
    dziennik.belongsTo(models.user, {
      foreignKey: {
        allowNull: true,
      },
    });
    dziennik.hasMany(models.komentarze, {
      onDelete: "cascade",
    });
    dziennik.hasMany(models.dzienZalaczniki, {
      onDelete: "cascade",
    });
  };

  return dziennik;
};
