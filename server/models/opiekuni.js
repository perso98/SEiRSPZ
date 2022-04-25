module.exports=(sequelize,DataTypes)=>
{
const opiekuni=sequelize.define("opiekuni",
{
    imie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    nazwisko:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    miejsce_pracy:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  opiekuni.associate = models => {
    opiekuni.hasMany(models.efektUczeniaSie, {
        onDelete:"cascade"
    });
  }

  opiekuni.associate = models => {
    opiekuni.hasMany(models.student, {
        onDelete:"cascade"
    });
  }

return opiekuni
}